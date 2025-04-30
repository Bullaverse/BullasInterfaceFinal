// File: app/api/user/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export async function GET(req: NextRequest) {
  try {
    const addressParam = req.nextUrl.searchParams.get("address");
    if (!addressParam) {
      return NextResponse.json(
        { message: "Address parameter is required" },
        { status: 400 }
      );
    }

    // Validate address format
    const { address } = userSchema.parse({ address: addressParam });
    
    // Use maybeSingle() instead of single() to avoid PGRST116 error
    const { data, error } = await supabase
      .from("users")
      .select("discord_id, address, points, last_played, team")
      .eq("address", address)
      .maybeSingle();

    console.log("Supabase query result:", { data, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Database error", error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("POST /api/user request body:", body);

    const { address } = userSchema.parse(body);

    // Check if user exists using maybeSingle()
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("address")
      .eq("address", address)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing user:", checkError);
      return NextResponse.json(
        { message: "Database error" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        address,
        points: 0,
        last_played: Math.floor(Date.now() / 1000),
        team: null,
        discord_id: null // Explicitly set to null initially
      });

    if (insertError) {
      console.error("Error creating user:", insertError);
      return NextResponse.json(
        { message: "Failed to create user", error: insertError.message },
        { status: 500 }
      );
    }

    // Fetch the newly created user to return
    const { data: newUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
      .maybeSingle();

    if (fetchError || !newUser) {
      console.error("Error fetching new user:", fetchError);
      return NextResponse.json(
        { message: "User created but failed to fetch" },
        { status: 201 }
      );
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/user error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}