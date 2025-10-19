import { createClient } from "./supabase/server";

export async function getTodos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  return data;
}
