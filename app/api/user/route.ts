import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  address: z.string(),
});

export async function GET(req: NextRequest) {
  const { address } = userSchema.parse({
    address: req.nextUrl.searchParams.get("address"),
  });

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)
    .single();

  if (!data) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { address } = userSchema.parse(await req.json());

  const { error } = await supabase.from("users").upsert({
    address,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User created" });
}
