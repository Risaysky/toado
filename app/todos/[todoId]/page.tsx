import TodoEditor from "@/app/components/TodoEditor";
import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("uuid", todoId);
  if (error) notFound();

  return <TodoEditor todo={data?.[0]} />;
}
