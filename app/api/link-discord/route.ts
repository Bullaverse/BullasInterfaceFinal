// File: app/api/link-discord/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    // First, try to update the existing user
    const { data: updateData, error: updateError } = await supabase
      .from("users")
      .update({ discord_id: discord })
      .eq("address", address)
      .select()
      .single();

    console.log("Update attempt result:", { updateData, updateError });

    if (updateError) {
      // If user doesn't exist, create a new one
      const { error: insertError } = await supabase
        .from("users")
        .insert({
          address,
          discord_id: discord,
          points: 0,
          last_played: Math.floor(Date.now() / 1000),
          team: null
        });

      if (insertError) {
        console.error("Failed to create user:", insertError);
        return NextResponse.json(
          { message: "Failed to link Discord account", error: insertError.message },
          { status: 500 }
        );
      }
    }

    // Mark token as used
    const { error: tokenUpdateError } = await supabase
      .from("tokens")
      .update({ used: true })
      .eq("token", token);

    if (tokenUpdateError) {
      console.error("Failed to update token:", tokenUpdateError);
      // Don't return error here as the link was successful
    }

    return NextResponse.json({ 
      message: "Discord linked successfully",
      data: updateData || { address, discord_id: discord }
    });

  } catch (error: any) {
    console.error("POST /api/link-discord error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}