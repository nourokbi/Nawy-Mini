"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setToken } from "@/lib/session";
import { login } from "@/api/auth";
import { ApiError } from "@/api/error";

// After login, return to the page in ?redirect= (set by the create gate),
// otherwise go to the home page.
function resolveRedirect(): string {
  const param = new URLSearchParams(window.location.search).get("redirect");
  return param && param.startsWith("/") ? param : "/";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const { token } = await login(email, password);
      setToken(token);
      router.push(resolveRedirect());
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-brand">
        Sign in
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-brand">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-brand"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-brand-accent font-bold hover:bg-brand-accent-hover"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
