"use client";
import React, { useState } from "react";
import { ITask } from "../../types/tasks";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../api";
import Model from "./Model";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.task);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const router = useRouter();

  const handleDeleteTask = async () => {
    try {
      await deleteTodo(task.id);
      setOpenModalDeleted(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedTask: ITask = {
        id: task.id,
        task: taskToEdit,
        date: new Date().toLocaleDateString(), // Update date to current date
      };

      await editTodo(updatedTask);

      setOpenModalEdit(false);
      router.refresh();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <tr key={task.id}>
      <td>{task.task}</td>
      <td>{task.date}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => setOpenModalDeleted(true)}
        >
          <MdDeleteForever
            cursor="pointer"
            className="text-red-500"
            size={20}
          />
        </button>
        {openModalDeleted && (
          <dialog
            id="delete_modal"
            className={`modal ${
              openModalDeleted ? "modal-open" : ""
            } sm:modal-middle`}
            open={openModalDeleted}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Task</h3>
              <p>Are you sure you want to delete this task?</p>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setOpenModalDeleted(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteTask}>
                  Delete
                </button>
              </div>
            </div>
          </dialog>
        )}
        <button
          className="btn btn-warning ml-2"
          onClick={() => setOpenModalEdit(true)}
        >
          <FaEdit cursor="pointer" className="text-white dark:to-black hover" size={20}  />
        </button>
        {openModalEdit && (
          <dialog
            id="edit_modal"
            className={`modal ${
              openModalEdit ? "modal-open" : ""
            } sm:modal-middle`}
            open={openModalEdit}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Task</h3>
              <form onSubmit={handleSubmitEditTodo}>
                <textarea
                  className="textarea textarea-info w-full"
                  placeholder="Enter task description"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                ></textarea>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() => setOpenModalEdit(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </td>
    </tr>
  );
};

export default Task;
