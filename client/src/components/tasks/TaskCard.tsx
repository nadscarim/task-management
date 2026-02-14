import React from "react";
import type { Task } from "../../core/interface/task.interface";
import { getStatusColor, getPriorityColor } from "../../core/utils/constant";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {task.title}
        </h3>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
            task.status,
          )}`}
        >
          {task.status.replace("_", " ")}
        </span>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
