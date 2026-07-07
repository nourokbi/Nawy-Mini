"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ApartmentsMeta } from "@/types/apartments";
import PageArrow from "./PageArrow";

type ApartmentsPaginationProps = {
  meta: ApartmentsMeta;
};

export default function ApartmentsPagination({
  meta,
}: ApartmentsPaginationProps) {
  const { page, totalPages } = meta;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Nothing to paginate.
  if (totalPages <= 1) return null;

  // Keep existing params (e.g. ?search=) and set/clear ?page.
  const hrefFor = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <nav
      aria-label="pagination"
      className="mt-10 flex items-center justify-center gap-3"
    >
      <PageArrow href={hrefFor(page - 1)} disabled={page <= 1}>
        <ChevronLeft className="size-4" />
        Prev
      </PageArrow>

      <span
        aria-current="page"
        className="inline-flex h-8 items-center rounded-lg border border-gray-200 px-3 text-sm font-semibold"
      >
        {page} of {totalPages}
      </span>

      <PageArrow href={hrefFor(page + 1)} disabled={page >= totalPages}>
        Next
        <ChevronRight className="size-4" />
      </PageArrow>
    </nav>
  );
}
