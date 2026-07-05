import { ApiError } from "./error";
import { CLIENT_API } from "./config";

type LoginResponse = { token: string };

/**
 * Log in with email + password.
 * Returns the JWT on success; throws ApiError (e.g. 401) on failure.
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${CLIENT_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new ApiError(res.status, "Invalid email or password.");
  }
  return res.json();
}
