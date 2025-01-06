import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerDiscordSchema = z.object({
  token: z.string(),
  discord: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  const { token, address, discord } = registerDiscordSchema.parse(
    await req.json(),
  );

  const { data, error } = await supabase
    .from("tokens")
    .select("used")
    .eq("token", token)
    .eq("discord_id", discord)
    .single();

  if (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { error: userError } = await supabase.from("users").upsert(
    {
      address: address,
      discord_id: discord,
    },
    {
      onConflict: "address",
    },
  );

  if (userError) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  await supabase.from("tokens").update({ used: true }).eq("token", token);

  return NextResponse.json({ message: "Discord linked successfully" });
}
