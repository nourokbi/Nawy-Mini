"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";

// Catches errors thrown while loading an apartment (e.g. backend unreachable
// or a 500 from getApartment). A 404/400 renders not-found.tsx instead.
export default function ApartmentError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Container>
      <main className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <h1 className="text-3xl font-bold text-brand">
          Couldn&apos;t load this apartment
        </h1>
        <p className="mt-3 text-gray-600">
          {error.message || "Something went wrong. Please try again."}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/apartments"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-gray-50"
          >
            Back to apartments
          </Link>
        </div>
      </main>
    </Container>
  );
}
