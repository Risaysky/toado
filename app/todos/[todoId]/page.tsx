import TodoEditor from "@/app/components/TodoEditor";
import { createClient } from "@/app/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("todos").select("*").eq("uuid", todoId);
  console.log(data);
  return <TodoEditor todo={data?.[0]} />;
}
