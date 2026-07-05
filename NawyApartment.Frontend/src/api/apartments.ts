import { notFound } from "next/navigation";
import type { Apartment, PaginatedApartments } from "@/app/apartments/types";
import { ApiError } from "./error";

// Server-side backend URL. Server (RSC) reads reach the backend over the
// internal network in Docker. (Centralized config comes in a later step.)
const API_BASE = process.env.API_URL ?? "http://localhost:3001/api/apartments";

// Browser-facing backend URL, used for the client-side create mutation.
const CLIENT_API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001") +
  "/api/apartments";

// Fields accepted when creating an apartment.
export type CreateApartmentInput = {
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
  address?: string;
};

/**
 * Fetch a page of apartments, optionally filtered by a search term.
 *
 * Branches between the two backend endpoints (both return the same
 * `{ data, meta }` envelope, so the caller gets the paginated result either way):
 *   - no term  -> GET /apartments          (full list)
 *   - term     -> GET /apartments/search   (filtered)
 */
export async function getApartments({
  search,
  page,
}: {
  search?: string;
  page?: number;
} = {}): Promise<PaginatedApartments> {
  const term = search?.trim();

  // Pick the endpoint based on whether we're searching.
  const url = new URL(term ? `${API_BASE}/search` : API_BASE);
  if (term) url.searchParams.set("search", term);
  if (page && page > 1) url.searchParams.set("page", String(page));

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      // Both endpoints return the same envelope: { data, meta }
      return res.json();
    }
  } catch {
    // Backend unreachable — fall through to the empty result below.
  }

  // On any failure (backend down or error response) return an empty page so
  // the listing page still renders instead of crashing.
  return {
    data: [],
    meta: { page: page ?? 1, limit: 9, total: 0, totalPages: 0 },
  };
}

// Fetch a single apartment by id.
export async function getApartment(id: string): Promise<Apartment> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  } catch {
    // Backend unreachable -> render the not-found page instead of crashing.
    notFound();
  }

  // Invalid id (400), no such apartment (404), or any other error response
  // -> render the not-found page rather than throwing.
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

/**
 * Create an apartment (client-side, requires a JWT).
 * Returns the created apartment; throws ApiError on failure
 * (e.g. 401 expired token, 409 duplicate unit number).
 */
export async function createApartment(
  input: CreateApartmentInput,
  token: string,
): Promise<Apartment> {
  const res = await fetch(CLIENT_API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.error ?? "Failed to create apartment.");
  }
  return res.json();
}
