// File: app/api/user/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for validating Ethereum addresses
const userSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export async function GET(req: NextRequest) {
  try {
    // Get address from query params
    const addressParam = req.nextUrl.searchParams.get("address");
    
    // Check if address exists
    if (!addressParam) {
      return NextResponse.json(
        { message: "Address parameter is required" }, 
        { status: 400 }
      );
    }

    // Validate address format
    const { address } = userSchema.parse({ address: addressParam });
    
    console.log("GET /api/user called with address:", address);

    // Query Supabase
    const { data, error } = await supabase
      .from("users")
      .select("discord_id, address, points, last_played, team")
      .eq("address", address)
      .single();

    // Log response for debugging
    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Database error:", error);
      
      // Handle "no rows found" case
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      
      // Handle other database errors
      return NextResponse.json(
        { message: "Database error", error: error.message },
        { status: 500 }
      );
    }

    // Return user data if found
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
    // Get request body
    const body = await req.json();
    console.log("POST /api/user called with body:", body);

    // Validate address
    const { address } = userSchema.parse(body);

    // Check if user exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("address")
      .eq("address", address)
      .maybeSingle();

    // Handle database errors
    if (existingUserError && existingUserError.code !== "PGRST116") {
      console.error("Database error checking user:", existingUserError);
      return NextResponse.json(
        { message: "Database error" },
        { status: 500 }
      );
    }

    // If user exists, return conflict
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Insert new user
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        address,
        points: 0,
        last_played: Math.floor(Date.now() / 1000),
        team: null,
      });

    if (insertError) {
      console.error("Error creating user:", insertError);
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("POST /api/user error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}