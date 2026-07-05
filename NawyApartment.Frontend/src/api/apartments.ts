import { notFound } from "next/navigation";
import type { Apartment, PaginatedApartments } from "@/types/apartments";
import { ApiError } from "./error";
import { SERVER_API, CLIENT_API } from "./config";

const API_BASE = `${SERVER_API}/apartments`;
const CLIENT_API_BASE = `${CLIENT_API}/apartments`;

// Fields accepted when creating an apartment.
export type CreateApartmentInput = {
  unitName: string;
  unitNumber: string;
  project: string;
  description?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
  address?: string;
};

// Fetch apartments with optional search term
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
      return res.json();
    }
  } catch {}

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
  apartment: CreateApartmentInput,
  token: string,
): Promise<Apartment> {
  const res = await fetch(CLIENT_API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(apartment),
  });

  if (!res.ok) {
    const data = (await res.json()) || {};
    throw new ApiError(res.status, data.error ?? "Failed to create apartment.");
  }
  return res.json();
}
