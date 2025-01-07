import { supabase } from "@/lib/supabase"; // Adjust path as needed
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerDiscordSchema = z.object({
  token: z.string(),
  discord: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Read request body exactly once
    const body = await req.json();
    console.log("POST /api/link-discord called with body:", body);

    // 2. Validate with Zod
    const { token, address, discord } = registerDiscordSchema.parse(body);

    // 3. Fetch token from DB
    const { data: tokenData, error: tokenError } = await supabase
      .from("tokens")
      .select("used")
      .eq("token", token)
      .eq("discord_id", discord)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 4. Check if token was already used
    if (tokenData.used) {
      return NextResponse.json({ message: "Token already used" }, { status: 401 });
    }

    // 5. Ensure this wallet address isn’t linked to a different Discord ID
    const { data: existingAddress, error: existingAddressError } = await supabase
      .from("users")
      .select("discord_id")
      .eq("address", address)
      .not("discord_id", "eq", discord)
      .single();

    if (existingAddressError) {
      console.error("Error verifying address:", existingAddressError);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    if (existingAddress) {
      return NextResponse.json(
        { message: "Address already linked to another Discord account" },
        { status: 400 }
      );
    }

    // 6. Upsert user row (onConflict ensures we only have one row per discord_id)
    const { error: userError } = await supabase
      .from("users")
      .upsert(
        {
          address,
          discord_id: discord,
        },
        { onConflict: "discord_id" }
      );

    if (userError) {
      console.error("Failed to upsert user:", userError);
      return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }

    // 7. Mark token as used
    const { error: tokenUpdateError } = await supabase
      .from("tokens")
      .update({ used: true })
      .eq("token", token);

    if (tokenUpdateError) {
      console.error("Failed to update token usage:", tokenUpdateError);
      return NextResponse.json({ message: "Failed to update token usage" }, { status: 500 });
    }

    // 8. Success
    return NextResponse.json({ message: "Discord linked successfully" });
  } catch (error: any) {
    console.error("Link discord error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
