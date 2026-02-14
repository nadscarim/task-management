import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../core/store/authSlice";
import { useAppDispatch } from "../core/store/hooks";
import type { FormData } from "../core/interface/auth.interface";

type AuthMode = "login" | "register";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (mode === "login") {
        result = await dispatch(
          login({
            email: form.email,
            password: form.password,
          }),
        ).unwrap();
      } else {
        result = await dispatch(
          register({
            email: form.email,
            password: form.password,
            name: form.name || "",
          }),
        ).unwrap();
      }
      console.log("Auth result:", result);
      navigate("/");
    } catch (err: unknown) {
      console.error("Auth error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`${mode === "login" ? "Login" : "Registration"} failed`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setForm({ email: "", password: "", name: "" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 font-bold text-center text-gray-800">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {mode === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 w-full mb-3"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={handleInputChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full mb-3 hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
