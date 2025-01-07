import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const userSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

export async function GET(req: NextRequest) {
  try {
    const { address } = userSchema.parse({
      address: req.nextUrl.searchParams.get("address"),
    });

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

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error("GET user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { address } = userSchema.parse(await req.json());

    const { data: existingUser } = await supabase
      .from("users")
      .select("address")
      .eq("address", address)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const { error } = await supabase
      .from("users")
      .upsert({
        address,
        points: 0,
        last_played: new Date().toISOString(),
      });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error("POST user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}