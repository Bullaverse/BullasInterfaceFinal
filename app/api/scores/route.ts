import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { data: bullas, error: bullasError } = await supabase.rpc(
      "sum_points_for_team",
      {
        team_name: "bullas",
      },
    );

    const { data: beras, error: berasError } = await supabase.rpc(
      "sum_points_for_team",
      {
        team_name: "beras",
      },
    );

    console.log(bullas, beras);

    return NextResponse.json({
      bullas: bullas ?? 0,
      beras: beras ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 },
    );
  }
}
