import AddTask from "@/components/AddTask";
import { getAllTodos } from "../../api";
import TaskList from "@/components/TaskList";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className="max-w-4xl mx-auto mt-4 max-h-96">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold ">
          Todo App
        </h1>
        <AddTask />
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
