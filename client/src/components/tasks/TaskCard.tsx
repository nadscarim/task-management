import React from "react";
import type { Task } from "../../core/interface/task.interface";
import { getStatusColor, getPriorityColor } from "../../core/utils/constant";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={onClick}
    >
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <div className="flex justify-between items-start mb-3 pr-6">
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
