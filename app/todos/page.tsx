import TodoPreview from "../components/TodoPreview";
import { createClient } from "../lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from("todos").select("*");
  return (
    <div className="grid grid-cols-1 gap-5 px-6 py-8">
      {data?.map((todo, index) => (
        <TodoPreview key={index} todo={todo} />
      ))}
    </div>
  );
}
