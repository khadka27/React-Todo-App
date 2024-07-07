import { ITask } from "./types/tasks";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }
    const todos = await res.json();
    return todos;
  } catch (error) {
    console.error("Fetch error:", error);
    console.log(`Base URL: ${baseUrl}`);
    throw error;
  }
};

export const addTodo = async (task: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`
      );
    }
    const todo = await res.json();
    return todo;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
