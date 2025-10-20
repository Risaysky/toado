"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTodos() {
  revalidateTag("/supabase");
  revalidatePath("/todos");
}
