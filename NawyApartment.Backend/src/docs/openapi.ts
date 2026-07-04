import { z } from "zod";
import { createApartmentSchema } from "../validations/apartment.schema.js";

// Reuse the real Zod validation schema as the single source of truth for the
// request body, converted to an OpenAPI 3.0 schema (Zod v4 native converter).
const createApartmentBodySchema = z.toJSONSchema(createApartmentSchema, {
  target: "openapi-3.0",
});

// Shared response shapes (mirror the DTOs in src/dtos/apartmentDtos.ts)
const apartmentDto = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    unitNumber: { type: "string", example: "MV-iCity-B4-102" },
    unitName: { type: "string", example: "Garden Apartment" },
    project: { type: "string", example: "Mountain View iCity" },
    price: { type: "integer", example: 9500000 },
    bedrooms: { type: "integer", example: 3 },
    bathrooms: { type: "integer", example: 3 },
    area: { type: "integer", example: 165 },
    imageUrl: { type: "string", nullable: true, example: "https://example.com/a.jpg" },
    address: { type: "string", nullable: true, example: "New Cairo, Cairo" },
  },
} as const;

const apartmentDetailsDto = {
  type: "object",
  properties: {
    ...apartmentDto.properties,
    description: { type: "string", example: "Spacious ground-floor apartment." },
  },
} as const;

// Paginated envelope returned by both the list and search endpoints.
const pagedApartments = {
  type: "object",
  properties: {
    data: { type: "array", items: apartmentDto },
    meta: {
      type: "object",
      properties: {
        page: { type: "integer", example: 1 },
        limit: { type: "integer", example: 9 },
        total: { type: "integer", example: 18 },
        totalPages: { type: "integer", example: 2 },
      },
    },
  },
} as const;

// Shared page/limit query parameters.
const paginationParams = [
  {
    name: "page",
    in: "query",
    required: false,
    schema: { type: "integer", minimum: 1, default: 1 },
    description: "1-based page number.",
  },
  {
    name: "limit",
    in: "query",
    required: false,
    schema: { type: "integer", minimum: 1, maximum: 50, default: 9 },
    description: "Items per page (max 50).",
  },
] as const;

const errorResponse = {
  type: "object",
  properties: { error: { type: "string" } },
} as const;

const validationErrorResponse = {
  type: "object",
  properties: {
    error: { type: "string", example: "Validation failed" },
    details: { type: "object" },
  },
} as const;

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Nawy Apartments API",
    version: "1.0.0",
    description:
      "REST API for listing, viewing and creating apartments. Built with Express, TypeScript, Prisma and PostgreSQL.",
  },
  servers: [{ url: "http://localhost:3001", description: "Local development" }],
  tags: [{ name: "Apartments", description: "Apartment listing, details and creation" }],
  paths: {
    "/api/apartments": {
      get: {
        tags: ["Apartments"],
        summary: "List apartments (paginated)",
        description:
          "Returns a paginated list of all apartments. Use `GET /api/apartments/search` to filter by a term.",
        parameters: [...paginationParams],
        responses: {
          "200": {
            description: "A page of apartments.",
            content: { "application/json": { schema: pagedApartments } },
          },
          "400": {
            description: "Invalid query parameters.",
            content: { "application/json": { schema: validationErrorResponse } },
          },
        },
      },
      post: {
        tags: ["Apartments"],
        summary: "Create an apartment",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: createApartmentBodySchema,
            },
          },
        },
        responses: {
          "201": {
            description: "Apartment created.",
            content: { "application/json": { schema: apartmentDetailsDto } },
          },
          "400": {
            description: "Validation failed or malformed JSON body.",
            content: { "application/json": { schema: validationErrorResponse } },
          },
          "409": {
            description: "An apartment with the same unit number already exists.",
            content: { "application/json": { schema: errorResponse } },
          },
        },
      },
    },
    "/api/apartments/search": {
      get: {
        tags: ["Apartments"],
        summary: "Search apartments (paginated)",
        description:
          "Returns a paginated list of apartments filtered by `search` (matches unit name, unit number or project, case-insensitive). Omitting `search` returns all apartments.",
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Filter by unit name, unit number or project.",
            example: "garden",
          },
          ...paginationParams,
        ],
        responses: {
          "200": {
            description: "A page of matching apartments.",
            content: { "application/json": { schema: pagedApartments } },
          },
          "400": {
            description: "Invalid query parameters.",
            content: { "application/json": { schema: validationErrorResponse } },
          },
        },
      },
    },
    "/api/apartments/{id}": {
      get: {
        tags: ["Apartments"],
        summary: "Get apartment details by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
            description: "Apartment UUID.",
          },
        ],
        responses: {
          "200": {
            description: "Apartment details.",
            content: { "application/json": { schema: apartmentDetailsDto } },
          },
          "400": {
            description: "Invalid UUID.",
            content: { "application/json": { schema: validationErrorResponse } },
          },
          "404": {
            description: "Apartment not found.",
            content: { "application/json": { schema: errorResponse } },
          },
        },
      },
    },
  },
} as const;
