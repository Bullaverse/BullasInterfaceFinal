// route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateWalletSchema = z.object({
  token: z.string(),
  discord: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { token, address, discord } = updateWalletSchema.parse(body);

    // Step 1: Verify token
    const { data: tokenData, error: tokenError } = await supabase
      .from("tokens")
      .select("used")
      .eq("token", token)
      .eq("discord_id", discord)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    if (tokenData.used) {
      return NextResponse.json(
        { message: "Token already used" },
        { status: 401 }
      );
    }

    // Step 2: Check if address is already linked to another Discord account
    const { data: existingAddressUser } = await supabase
      .from("users")
      .select("discord_id")
      .eq("address", address)
      .not("discord_id", "eq", discord)
      .single();

    if (existingAddressUser) {
      return NextResponse.json(
        { message: "This wallet address is already linked to another Discord account" },
        { status: 400 }
      );
    }

    // Step 3: Find existing user by Discord ID and update their address
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("discord_id", discord)
      .single();

    if (existingUser) {
      // Update existing user's address
      const { error: updateError } = await supabase
        .from("users")
        .update({ address: address })
        .eq("discord_id", discord);

      if (updateError) {
        console.error("Error updating user:", updateError);
        return NextResponse.json(
          { message: "Failed to update wallet address" },
          { status: 500 }
        );
      }
    } else {
      // Only create new user if they don't exist
      const { error: createError } = await supabase
        .from("users")
        .insert({
          address: address,
          discord_id: discord,
          points: 0
        });

      if (createError) {
        console.error("Error creating user:", createError);
        return NextResponse.json(
          { message: "Failed to create new user" },
          { status: 500 }
        );
      }
    }

    // Step 4: Mark token as used
    await supabase
      .from("tokens")
      .update({ used: true })
      .eq("token", token);

    return NextResponse.json({ 
      message: "Wallet updated successfully",
      success: true 
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false
      },
      { status: 500 }
    );
  }
}