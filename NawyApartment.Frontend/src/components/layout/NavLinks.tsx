"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Plus } from "lucide-react";

export default function NavLinks() {
  const pathname = usePathname();

  // "Create" is a sub-route of /apartments, so match it exactly and exclude it
  // from the "Apartments" match to avoid both links being active at once.
  const isCreateActive = pathname === "/apartments/create";
  const isApartmentsActive =
    pathname.startsWith("/apartments") && !isCreateActive;

  const base =
    "flex items-center gap-1.5 text-sm font-semibold transition-colors sm:text-lg";
  const active = "text-[#FF5E00]";
  const inactive = "text-gray-700 hover:text-gray-900";

  return (
    <>
      <Link
        href="/apartments"
        aria-current={isApartmentsActive ? "page" : undefined}
        className={`ml-auto pr-3 sm:pr-4 ${base} ${isApartmentsActive ? active : inactive}`}
      >
        <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
        Apartments
      </Link>
      <Link
        href="/apartments/create"
        aria-current={isCreateActive ? "page" : undefined}
        className={`${base} ${isCreateActive ? active : inactive}`}
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        Create
      </Link>
    </>
  );
}
