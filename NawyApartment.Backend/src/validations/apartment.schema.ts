import { z } from "zod";

// Validating the request body for creating a new apartment
export const createApartmentSchema = z.object({
  unitName: z
    .string()
    .trim()
    .min(1, "unitName is required")
    .max(100, "unitName must be at most 100 characters"),
  unitNumber: z
    .string()
    .trim()
    .min(1, "unitNumber is required")
    .max(50, "unitNumber must be at most 50 characters"),
  project: z
    .string()
    .trim()
    .min(1, "project is required")
    .max(100, "project must be at most 100 characters"),
  description: z.string().trim().nullish(),
  price: z.number().int().min(1000).max(1000000000),
  bedrooms: z.number().int().min(0).max(20),
  bathrooms: z.number().int().min(1).max(12),
  area: z.number().int().min(20).max(4200),
  imageUrl: z.url().nullish(),
  address: z.string().trim().nullish(),
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
