"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { revalidateTag } from "next/cache";

export async function addTodo() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("todos")
    .insert({
      list: [],
    })
    .select();

  revalidateTag("supabase");
  redirect(`/todos/${data?.[0].uuid}`);
}
