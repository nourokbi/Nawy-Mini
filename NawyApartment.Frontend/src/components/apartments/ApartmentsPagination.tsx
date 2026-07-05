"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { ApartmentsMeta } from "@/app/apartments/types";

type ApartmentsPaginationProps = {
  meta: ApartmentsMeta;
};

// Build the visible page list: always first & last, a window around the
// current page, and "ellipsis" markers where there are gaps.
function getPageItems(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  const items: Array<number | "ellipsis"> = [];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  items.push(1);
  if (left > 2) items.push("ellipsis");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < total - 1) items.push("ellipsis");
  if (total > 1) items.push(total);

  return items;
}

export default function ApartmentsPagination({
  meta,
}: ApartmentsPaginationProps) {
  const { page, totalPages } = meta;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Nothing to paginate.
  if (totalPages <= 1) return null;

  // Keep existing params (e.g. ?search=) and set/clear ?page.
  const hrefFor = (p: number) => {
    const params = new URLSearchParams(searchParams);
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  // Client-side (soft) navigation instead of a full reload.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, p: number) => {
    e.preventDefault();
    if (p < 1 || p > totalPages || p === page) return;
    router.push(hrefFor(p));
  };

  const items = getPageItems(page, totalPages);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hrefFor(page - 1)}
            onClick={(e) => go(e, page - 1)}
            aria-disabled={isFirst}
            className={isFirst ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {items.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={hrefFor(item)}
                isActive={item === page}
                onClick={(e) => go(e, item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={hrefFor(page + 1)}
            onClick={(e) => go(e, page + 1)}
            aria-disabled={isLast}
            className={isLast ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
