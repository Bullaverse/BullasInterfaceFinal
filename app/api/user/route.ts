// pages/api/user.ts (Assuming this is the correct path)
import { supabase } from "@/lib/supabase"; // Using the existing supabase.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for user validation
const userSchema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export async function GET(req: NextRequest) {
  try {
    // 1. Extract 'address' from query string
    const addressParam = req.nextUrl.searchParams.get("address");

    // 2. Validate address
    const { address } = userSchema.parse({ address: addressParam });

    console.log("GET /api/user called with address:", address);

    // 3. Fetch user row
    const { data, error } = await supabase
      .from("users")
      .select("discord_id, address, points, last_played, team")
      .eq("address", address)
      .single();

    if (error) {
      if (error.code === "PGRST116") { // No rows found
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      console.error("Database error:", error);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    // 4. Success
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Read request body once
    const body = await req.json();

    // 2. Validate with Zod
    const { address } = userSchema.parse(body);

    console.log("POST /api/user called to create user with address:", address);

    // 3. Check if user with this address already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("address")
      .eq("address", address)
      .maybeSingle(); // Use maybeSingle to avoid throwing an error if no user is found

    if (existingUserError && existingUserError.code !== "PGRST116") { // Handle unexpected errors
      console.error("Database error during user existence check:", existingUserError);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    if (existingUser) {
      console.log("User already exists:", address);
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // 4. Insert new user
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        address,
        points: 0,
        last_played: Math.floor(Date.now() / 1000),
        team: null,
      });

    if (insertError) {
      console.error("Database error during user insertion:", insertError);
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    console.log("User created successfully:", address);

    // 5. Success
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("POST user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
