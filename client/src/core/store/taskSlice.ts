import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type {
  TaskState,
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../interface/task.interface";

axios.defaults.withCredentials = true;

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>("/api/v1/tasks");
    return response.data;
  },
);

export const fetchTaskById = createAsyncThunk<Task, string>(
  "tasks/fetchTaskById",
  async (id: string) => {
    const response = await axios.get<Task>(`/api/v1/tasks/${id}`);
    return response.data;
  },
);

export const createTask = createAsyncThunk<Task, CreateTaskPayload>(
  "tasks/createTask",
  async (taskData: CreateTaskPayload) => {
    const response = await axios.post<Task>("/api/v1/tasks", taskData);
    return response.data;
  },
);

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload>(
  "tasks/updateTask",
  async ({ id, ...taskData }: UpdateTaskPayload) => {
    const response = await axios.put<Task>(`/api/v1/tasks/${id}`, taskData);
    return response.data;
  },
);

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })

      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTaskById.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          state.currentTask = action.payload;
        },
      )
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch task";
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      });
  },
});

export const { clearCurrentTask, clearError } = taskSlice.actions;
export default taskSlice.reducer;
