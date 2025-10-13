"use client";
import { createClient } from "./supabase/client";

export async function getTodos() {
  const supabase = createClient();
  const { data } = await supabase.from("todos").select("*");
  return data;
}
