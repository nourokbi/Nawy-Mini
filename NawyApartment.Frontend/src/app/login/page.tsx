"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setToken } from "@/lib/session";
import { login } from "@/api/auth";
import { ApiError } from "@/api/error";

// Where to send the user after login:
// 1) an explicit ?redirect= (used by the create gate), else
// 2) the last page they were on (tracked by RouteTracker), else
// 3) the landing page.
function resolveRedirect(): string {
  const param = new URLSearchParams(window.location.search).get("redirect");
  if (param && param.startsWith("/")) return param;

  const last = sessionStorage.getItem("lastPath");
  if (last && last.startsWith("/") && last !== "/login") return last;

  return "/";
}

export default function LoginPage() {
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
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-[#1E4164]">
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
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#1E4164]"
            >
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
              className="text-sm font-medium text-[#1E4164]"
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
            className="h-11 w-full bg-[#FF5E00] font-bold hover:bg-[#e65400]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
