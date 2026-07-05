"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Browser-facing backend URL. Set NEXT_PUBLIC_API_BASE at build time (Docker)
// to point at the backend's published host port; defaults to local dev.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";
const LOGIN_URL = `${API_BASE}/api/auth/login`;

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
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      const { token } = await res.json();
      // Store the token so the create route can use it (matches the 5m expiry).
      document.cookie = `nawy_token=${token}; path=/; max-age=3600`;
      router.push("/apartments/create");
    } catch {
      setError("Something went wrong. Please try again.");
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
