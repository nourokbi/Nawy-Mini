// Backend base URLs.
//
// The frontend runs code in TWO places that reach the SAME backend via
// DIFFERENT network paths:
//
//   - Server (RSC) code runs INSIDE the frontend container, on Docker's
//     internal network -> it reaches the backend by its compose service name
//     (`http://backend:3001`). It cannot use localhost (that would be the
//     frontend container itself).
//
//   - Browser (client) code runs on the user's machine, OFF the Docker network
//     -> it reaches the backend via its published host port
//     (`http://localhost:3101`). It cannot resolve the `backend` service name.
//
// Values come from env vars set in docker-compose. The fallbacks below are for
// local dev, where everything is on one machine (a single origin).

const SERVER_ROOT = process.env.API_URL ?? "http://localhost:3001";
const CLIENT_ROOT = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

// Used by server-side (RSC) reads.
export const SERVER_API = `${SERVER_ROOT}/api`;

// Used by client-side (browser) calls — login, create.
export const CLIENT_API = `${CLIENT_ROOT}/api`;
