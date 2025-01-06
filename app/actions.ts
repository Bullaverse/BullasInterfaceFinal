"use server";

import { supabase } from "@/lib/supabase";
import { hasPlayedInLast24Hours } from "@/lib/utils";

export async function addPoints(
  address: string,
  points: number,
  currentTime: number,
) {
  // Check user hasn't played in last 24 hours
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (data.last_played) {
    if (hasPlayedInLast24Hours(currentTime, data.last_played)) {
      throw new Error("You have already played in the last 24 hours");
    }
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .update({
      points: data.points + points,
      last_played: Math.floor(Date.now() / 1000),
    })
    .eq("address", address);

  if (userError) {
    throw new Error(userError.message);
  }

  return data;
}
