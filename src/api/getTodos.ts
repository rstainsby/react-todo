import { MultipleTodosResponse } from "../types/apiResponseTypes";
import { MultipleTodosQueryParameters } from "../types/apiQueryParameters";

const API_URL = import.meta.env.VITE_TODO_API_URL;

export default async function getTodosForUser(userId: number, query?: MultipleTodosQueryParameters): Promise<MultipleTodosResponse> {
  const searchParams = query ? new URLSearchParams(query as Record<string, string>) : '';
  const response = await fetch(`${API_URL}/user/${userId}` + searchParams.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
}
