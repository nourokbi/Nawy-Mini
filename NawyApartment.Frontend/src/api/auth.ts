import { ApiError } from "./error";

// Browser-facing backend URL. In Docker this points at the backend's published
// host port; defaults to local dev. (Centralized config comes in a later step.)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

type LoginResponse = { token: string };

/**
 * Log in with email + password.
 * Returns the JWT on success; throws ApiError (e.g. 401) on failure.
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new ApiError(res.status, "Invalid email or password.");
  }
  return res.json();
}
