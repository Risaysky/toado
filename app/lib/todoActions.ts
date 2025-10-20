"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Database } from "./database.types";

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

export async function revalidateTodos() {
  revalidateTag("/supabase");
  revalidatePath("/todos");
}

export async function getTodos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  return data;
}

export async function deleteTodo(uuid: string) {
  const supabase = await createClient();
  await supabase.from("todos").delete().eq("uuid", uuid);

  revalidateTag("supabase");
}

export async function updateTodo(
  todo: Database["public"]["Tables"]["todos"]["Update"],
) {
  const supabase = await createClient();
  await supabase
    .from("todos")
    .update({ title: todo.title, list: todo.list })
    .eq("uuid", todo.uuid as string);

  revalidateTag("supabase");
}
