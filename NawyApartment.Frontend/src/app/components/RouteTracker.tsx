"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Remembers the last page the user visited (except /login) so the login page
// can send them back there after signing in. Rendered once in the root layout.
export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login") {
      sessionStorage.setItem("lastPath", pathname);
    }
  }, [pathname]);

  return null;
}
