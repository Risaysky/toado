"use server";

import { createClient } from "./supabase/server";
import { revalidateTag } from "next/cache";

export async function deleteTodo(uuid: string) {
  const supabase = await createClient();
  const {} = await supabase.from("todos").delete().eq("uuid", uuid);

  revalidateTag("supabase");
}
