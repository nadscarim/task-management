import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { User, AuthState } from "../interface/auth.interface";

axios.defaults.withCredentials = true;

export const fetchUser = createAsyncThunk<User>("auth/fetchUser", async () => {
  const res = await axios.get<User>("/api/v1/auth/me");
  return res.data; // /me returns user directly, not wrapped
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async (credentials) => {
  const res = await axios.post<{ message: string; user: User }>(
    "/api/v1/auth/login",
    credentials,
  );
  return res.data.user;
});

export const register = createAsyncThunk<
  User,
  { email: string; password: string; name: string }
>("auth/register", async (credentials) => {
  const res = await axios.post<{ message: string; user: User }>(
    "/api/v1/auth/register",
    credentials,
  );
  return res.data.user;
});

export const logout = createAsyncThunk<void>("auth/logout", async () => {
  await axios.post("/api/v1/auth/logout");
});

export const refreshToken = createAsyncThunk<void>("auth/refresh", async () => {
  await axios.post("/api/v1/auth/refresh");
});

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || "Registration failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
