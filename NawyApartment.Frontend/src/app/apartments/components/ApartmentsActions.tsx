"use client";

// import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function ApartmentsActions() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Push the search term into the URL (?search=...) after a short debounce,
  // so the server component re-fetches without firing on every keystroke.
  function handleSearch(term: string) {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  }

  return (
    <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3">
      <input
        type="text"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by Unit Name, Unit Number, or Project..."
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#1E4164] focus:ring-1 focus:ring-[#1E4164] shadow-md"
      />
    </div>
  );
}
