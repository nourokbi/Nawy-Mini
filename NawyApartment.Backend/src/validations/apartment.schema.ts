import { z } from "zod";

// Validating the request body for creating a new apartment
export const createApartmentSchema = z.object({
  unitName: z.string().trim().min(1, "unitName is required"),
  unitNumber: z.string().trim().min(1, "unitNumber is required"),
  project: z.string().trim().min(1, "project is required"),
  description: z.string().trim().min(1, "description is required"),
  price: z.number().int().nonnegative(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().int().positive(),
  imageUrl: z.url().optional(),
  address: z.string().trim().optional(),
});

export type CreateApartmentBody = z.infer<typeof createApartmentSchema>;

// Pagination query for the list endpoint: GET /apartments
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(9),
});

export type PaginationQuery = z.infer<typeof paginationSchema>;

// Search query for the dedicated endpoint: GET /apartments/search
// Reuses the pagination fields and adds an optional search term.
export const searchApartmentsSchema = paginationSchema.extend({
  search: z.string().trim().optional(),
});

export type SearchApartmentsQuery = z.infer<typeof searchApartmentsSchema>;

export const getApartmentByIdSchema = z.object({
  id: z.uuid("Invalid apartment ID"),
});

export type GetApartmentByIdParams = z.infer<typeof getApartmentByIdSchema>;
