export async function POST(req: NextRequest) {
  try {
    const { token, address, discord } = registerDiscordSchema.parse(
      await req.json(),
    );

    // First check if token exists and is unused
    const { data: tokenData, error: tokenError } = await supabase
      .from("tokens")
      .select("used")
      .eq("token", token)
      .eq("discord_id", discord)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (tokenData.used) {
      return NextResponse.json({ message: "Token already used" }, { status: 401 });
    }

    // Check if address already linked to another discord
    const { data: existingUser } = await supabase
      .from("users")
      .select("discord_id")
      .eq("address", address)
      .not("discord_id", "eq", discord)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "Address already linked to another Discord account" },
        { status: 400 }
      );
    }

    // Create/update user
    const { error: userError } = await supabase
      .from("users")
      .upsert(
        {
          address: address,
          discord_id: discord,
          points: 0
        },
        {
          onConflict: "discord_id"
        }
      );

    if (userError) {
      console.error("User update error:", userError);
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 500 }
      );
    }

    // Mark token as used
    await supabase
      .from("tokens")
      .update({ used: true })
      .eq("token", token);

    return NextResponse.json({ success: true, message: "Discord linked successfully" });
  } catch (error) {
    console.error("Link discord error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}