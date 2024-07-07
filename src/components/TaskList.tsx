import React from "react";
import { ITask } from "../../types/tasks";
import Task from "./Task";

interface DisplayAddedTaskProps {
  tasks: ITask[];
}

const TaskList: React.FC<DisplayAddedTaskProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
