export type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  address: string;
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
