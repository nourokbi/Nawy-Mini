const TOKEN_COOKIE = "nawy_token";
// get the JWT from the cookies
export function getToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${TOKEN_COOKIE}=`))
    ?.split("=")[1];
}
// set token for new JWT (expires in 1 hour)
export function setToken(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=3600`;
}

export function clearToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function isAuthenticated(): boolean {
  return getToken() !== undefined;
}
