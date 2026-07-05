// Client-side helpers for the mock JWT stored in a cookie (the browser "session").

const TOKEN_COOKIE = "nawy_token";

export function getToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${TOKEN_COOKIE}=`))
    ?.split("=")[1];
}

export function setToken(token: string) {
  // 1 hour, aligned with the backend token expiry.
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=3600`;
}

export function clearToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

// True only if a non-expired token is present. This is a UX gate — the backend
// still verifies the signature on every protected request.
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    // JWT payloads are base64url — normalize to base64 (+ padding) before atob.
    let part = (token.split(".")[1] ?? "").replace(/-/g, "+").replace(/_/g, "/");
    part += "=".repeat((4 - (part.length % 4)) % 4);
    const payload = JSON.parse(atob(part));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
