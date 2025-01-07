import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerDiscordSchema = z.object({
  token: z.string(),
  discord: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  console.log("POST /api/link-discord called with body:", await req.json());
  try {
    const { token, address, discord } = registerDiscordSchema.parse(
      await req.json(),
    );

    const { data: tokenData, error: tokenError } = await supabase
      .from("tokens")
      .select("used")
      .eq("token", token)
      .eq("discord_id", discord)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (tokenData.used) {
      return NextResponse.json({ message: "Token already used" }, { status: 401 });
    }

    const { data: existingAddress } = await supabase
      .from("users")
      .select("discord_id")
      .eq("address", address)
      .not("discord_id", "eq", discord)
      .single();

    if (existingAddress) {
      return NextResponse.json(
        { message: "Address already linked to another Discord account" },
        { status: 400 }
      );
    }

    const { error: userError } = await supabase.from("users").upsert(
      {
        address: address,
        discord_id: discord,
      },
      {
        onConflict: "discord_id"
      }
    );

    if (userError) {
      return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }

    await supabase.from("tokens").update({ used: true }).eq("token", token);
    return NextResponse.json({ message: "Discord linked successfully" });
  } catch (error) {
    console.error("Link discord error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}