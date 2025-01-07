// File: app/api/link-discord/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for validating discord link request
const registerDiscordSchema = z.object({
  token: z.string(),
  discord: z.string(),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export async function POST(req: NextRequest) {
  try {
    // Get and log request body
    const body = await req.json();
    console.log("POST /api/link-discord called with body:", body);

    // Validate request data
    const { token, address, discord } = registerDiscordSchema.parse(body);
    console.log("Validated data:", { token, address, discord });

    // Check if token exists and is valid
    const { data: tokenData, error: tokenError } = await supabase
      .from("tokens")
      .select("used")
      .eq("token", token)
      .eq("discord_id", discord)
      .single();

    console.log("Token check response:", { tokenData, tokenError });

    if (tokenError || !tokenData) {
      console.error("Token verification failed:", tokenError);
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Check if token was already used
    if (tokenData.used) {
      return NextResponse.json(
        { message: "Token already used" },
        { status: 401 }
      );
    }

    // Check if address is already linked to another Discord account
    const { data: existingAddress, error: existingAddressError } = await supabase
      .from("users")
      .select("discord_id")
      .eq("address", address)
      .not("discord_id", "eq", discord)
      .single();

    if (existingAddressError && existingAddressError.code !== "PGRST116") {
      console.error("Error checking address:", existingAddressError);
      return NextResponse.json(
        { message: "Database error" },
        { status: 500 }
      );
    }

    if (existingAddress) {
      return NextResponse.json(
        { message: "Address already linked to another Discord account" },
        { status: 400 }
      );
    }

    // Update user record
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
      console.error("Failed to update user:", userError);
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 500 }
      );
    }

    // Mark token as used
    const { error: tokenUpdateError } = await supabase
      .from("tokens")
      .update({ used: true })
      .eq("token", token);

    if (tokenUpdateError) {
      console.error("Failed to update token:", tokenUpdateError);
      return NextResponse.json(
        { message: "Failed to update token" },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json({ message: "Discord linked successfully" });

  } catch (error: any) {
    console.error("POST /api/link-discord error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error.message
      },
      { status: 500 }
    );
  }
}