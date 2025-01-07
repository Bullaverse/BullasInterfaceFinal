import { supabase } from "@/lib/supabase"; // Adjust path as needed
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

export async function GET(req: NextRequest) {
  try {
    // 1. Extract 'address' from query string
    const addressParam = req.nextUrl.searchParams.get("address");

    // 2. Validate address
    const { address } = userSchema.parse({ address: addressParam });
    console.log("GET /api/user called with:", address);

    // 3. Fetch user row
    const { data, error } = await supabase
      .from("users")
      .select("discord_id, address, points, last_played, team")
      .eq("address", address)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Success
    return NextResponse.json(data);
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

    // 3. Check if user with this address already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("address")
      .eq("address", address)
      .single();

    if (existingUserError) {
      console.error("Database error:", existingUserError);
      return NextResponse.json({ message: existingUserError.message }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // 4. Insert or upsert new user
    const { error: upsertError } = await supabase
      .from("users")
      .upsert({
        address,
        points: 0,
        last_played: Math.floor(Date.now() / 1000),
        team: null
      });

    if (upsertError) {
      console.error("Database error:", upsertError);
      return NextResponse.json({ message: upsertError.message }, { status: 500 });
    }

    // 5. Success
    return NextResponse.json({ message: "User created successfully" });
  } catch (error: any) {
    console.error("POST user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
