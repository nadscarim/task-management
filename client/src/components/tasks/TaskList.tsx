import React, { useEffect, useState } from "react";
import type { Task, TaskFormData } from "../../core/interface/task.interface";
import { clearError } from "../../core/store/authSlice";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import {
  fetchTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../../core/store/taskSlice";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleOpenModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (taskData: TaskFormData) => {
    if (editingTask) {
      await dispatch(updateTask({ id: editingTask.id, ...taskData }));
    } else {
      await dispatch(createTask(taskData));
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, {user?.name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            + New Task
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && tasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No tasks yet. Create your first task!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => handleOpenModal(task)}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        key={editingTask?.id || "new"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingTask={editingTask}
        loading={loading}
      />
    </div>
  );
};

export default TaskList;
