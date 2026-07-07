import { notFound } from "next/navigation";
import type {
  Apartment,
  PaginatedApartments,
  CreateApartmentInput,
} from "@/types/apartments";
import { ApiError } from "./error";
import { SERVER_API, CLIENT_API } from "./config";

const API_BASE = `${SERVER_API}/apartments`;
const CLIENT_API_BASE = `${CLIENT_API}/apartments`;

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
    throw new Error("Unable to reach the server.");
  }

  if (res.status === 404 || res.status === 400) {
    notFound();                                    
  }
  if (!res.ok) {
    throw new Error("Failed to load apartment.");
  }
  return res.json();
}

//Create an apartment (client-side, requires a JWT).
//Returns the created apartment; throws ApiError on failure
//e.g. 401 expired token, 409 duplicate unit number).
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
    // On a validation error the backend sends a `details` tree; surface the
    // first field's first message instead of the generic "Validation failed".
    const firstError = Object.values<{ errors?: string[] }>(
      data.details?.properties ?? {},
    )[0]?.errors?.[0];
    throw new ApiError(
      res.status,
      firstError ?? data.error ?? "Failed to create apartment.",
    );
  }
  return res.json();
}
