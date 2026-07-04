import { notFound } from "next/navigation";
import { Apartment, PaginatedApartments } from "./types";

// Backend base URL. Override with API_URL in .env for other environments.
const API_BASE = 
  process.env.API_URL ?? "http://localhost:3001/api/apartments";

/**
 * Fetch a page of apartments, optionally filtered by a search term.
 *
 * Branches between the two backend endpoints (both return the same
 * `{ data, meta }` envelope, so the caller gets the paginated result either way):
 *   - no term  -> GET /apartments          (full list)
 *   - term     -> GET /apartments/search   (filtered)
 *
 * `page` maps to the backend's page param; `limit` is left to the backend default.
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
