import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

interface Todo {
  id: number | string;
  name?: string;
  title?: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getTodos() {
      const { data: todos, error } = await supabase.from("todos").select();

      if (error) {
        setError(error.message);
      } else if (todos) {
        setTodos(todos);
      }
    }

    getTodos();
  }, []);

  return (
    <div className="container-x mx-auto max-w-xl py-16">
      <h1 className="font-display text-3xl font-bold mb-6">Supabase Todos Test</h1>
      {error && <p className="text-red-500 mb-4">Error fetching todos: {error}</p>}
      {todos.length === 0 && !error && (
        <p className="text-muted-foreground">No todos found or table is empty.</p>
      )}
      <ul className="list-disc pl-5 space-y-2 mt-4">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name || todo.title || JSON.stringify(todo)}</li>
        ))}
      </ul>
    </div>
  );
}
