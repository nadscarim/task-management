export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | undefined;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | undefined;
}

export interface UpdateTaskPayload {
  id: string;
  title?: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | undefined;
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: TaskFormData) => void;
  editingTask: Task | null;
  loading: boolean;
}
