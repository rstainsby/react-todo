import { Todo } from "@/types/apiResponseTypes";

const API_URL = import.meta.env.VITE_TODO_API_URL;

export default async function postTodo(todo: Todo): Promise<Todo> {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to post todo');
  }

  return response.json();
};