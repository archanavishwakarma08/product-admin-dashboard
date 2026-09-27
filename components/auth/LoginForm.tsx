"use client";

import {
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setError("");

    if (!username.trim() || !password.trim()) {
      setError(
        "Username and password are required."
      );
      return;
    }

    try {
      await login({
        username: username.trim(),
        password,
      });

      router.push("/products");
    } catch {
      setError(
        "Invalid username or password."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span
            className="mt-0.5 font-semibold"
            aria-hidden="true"
          >
            !
          </span>

          <p>{error}</p>
        </div>
      )}

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          disabled={isLoading}
          autoComplete="username"
          placeholder="Enter your username"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            disabled={isLoading}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) => !current
              )
            }
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-900 disabled:cursor-not-allowed"
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>
      </div>

      {/* Login button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}