"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/session";

// Auth state doesn't change reactively during a page's life, so there's nothing
// to subscribe to — we just need an SSR-safe snapshot read.
const subscribe = () => () => {};

/**
 * Client-side route guard for protected pages.
 *
 * Returns whether the user is authenticated; if not, redirects to /login
 * (remembering `returnTo`). Callers should render nothing until it returns true,
 * e.g. `if (!useRequireAuth(path)) return null;`.
 *
 * Uses useSyncExternalStore so the cookie is read without setState-in-effect and
 * without a hydration mismatch (server snapshot is always false).
 */
export function useRequireAuth(returnTo: string): boolean {
  const router = useRouter();

  const authed = useSyncExternalStore(
    subscribe,
    () => isAuthenticated(), // client snapshot
    () => false, // server snapshot
  );

  useEffect(() => {
    if (!authed) {
      router.replace(`/login?redirect=${encodeURIComponent(returnTo)}`);
    }
  }, [authed, router, returnTo]);

  return authed;
}
