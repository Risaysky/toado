import TodoPreview from "@/app/components/TodoPreview";
import TodoEditor from "@/app/components/TodoEditor";
import { getTodos } from "@/app/lib/todoActions";
import { createClient } from "@/app/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

type pageProps = { params: Promise<{ todoId: string }> };

export default async function Page({ params }: pageProps) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { todoId } = await params;
  const todos = await getTodos();
  const selectedTodo = todos?.find((todo) => todo.uuid === todoId?.[0]);

  if (!todoId) {
    return (
      <div className="grid grid-cols-1 gap-5 px-6 py-8">
        {todos?.map((todo, index) => (
          <TodoPreview key={index} todo={todo} />
        ))}
      </div>
    );
  }

  if (selectedTodo) {
    return <TodoEditor todo={selectedTodo} />;
  }

  notFound();
}
