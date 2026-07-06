export type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string | null;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string | null;
  address: string | null;
};

// Pagination metadata returned by the list/search endpoints.
export type ApartmentsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// The full envelope both endpoints return.
export type PaginatedApartments = {
  data: Apartment[];
  meta: ApartmentsMeta;
};

// Fields accepted when creating an apartment.
export type CreateApartmentInput = {
  unitName: string;
  unitNumber: string;
  project: string;
  description: string | null;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string | null;
  address: string | null;
};
