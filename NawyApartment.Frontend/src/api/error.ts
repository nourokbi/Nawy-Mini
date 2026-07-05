// Thrown by API functions when the backend responds with a non-OK status.
// Carries the HTTP status so callers can react (e.g. 401 -> re-login).
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
