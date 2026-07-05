import { z } from "zod";
import { createApartmentSchema } from "../validations/apartment.schema.js";
import { loginSchema } from "../validations/auth.schema.js";

// Reuse the real Zod schemas as the single source of truth for request bodies.
const toOpenApi = (schema: z.ZodType) =>
  z.toJSONSchema(schema, { target: "openapi-3.0" });

const createApartmentBody = toOpenApi(createApartmentSchema);
const loginBody = toOpenApi(loginSchema);

// ── Reusable response shapes (mirror the DTOs) ──
const apartment = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    unitName: { type: "string", example: "Garden Apartment" },
    unitNumber: { type: "string", example: "MV-iCity-B4-102" },
    project: { type: "string", example: "Mountain View iCity" },
    price: { type: "integer", example: 9500000 },
    bedrooms: { type: "integer", example: 3 },
    bathrooms: { type: "integer", example: 3 },
    area: { type: "integer", example: 165 },
    imageUrl: { type: "string", nullable: true },
    address: { type: "string", nullable: true },
  },
} as const;

const apartmentDetails = {
  type: "object",
  properties: {
    ...apartment.properties,
    description: { type: "string", example: "Spacious ground-floor apartment." },
  },
} as const;

const pagedApartments = {
  type: "object",
  properties: {
    data: { type: "array", items: apartment },
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

const errorBody = {
  type: "object",
  properties: { error: { type: "string" } },
} as const;

const paginationParams = [
  {
    name: "page",
    in: "query",
    required: false,
    schema: { type: "integer", minimum: 1, default: 1 },
  },
  {
    name: "limit",
    in: "query",
    required: false,
    schema: { type: "integer", minimum: 1, maximum: 50, default: 9 },
  },
] as const;

// Small helpers to keep the paths section compact.
const json = (schema: unknown) => ({ "application/json": { schema } });

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Nawy Mini API",
    version: "1.0.0",
    description:
      "Apartment listing API (Express + Prisma + PostgreSQL). Create requires a JWT — log in via `/api/auth/login`, then click **Authorize** and paste the token.",
  },
  servers: [{ url: "http://localhost:3001", description: "Local" }],
  tags: [
    { name: "Apartments" },
    { name: "Auth" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
  paths: {
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and receive a JWT (valid 1 hour)",
        requestBody: { required: true, content: json(loginBody) },
        responses: {
          "200": {
            description: "Token issued.",
            content: json({
              type: "object",
              properties: { token: { type: "string" } },
            }),
          },
          "400": { description: "Validation failed.", content: json(errorBody) },
          "401": {
            description: "Invalid email or password.",
            content: json(errorBody),
          },
        },
      },
    },

    "/api/apartments": {
      get: {
        tags: ["Apartments"],
        summary: "List apartments (paginated)",
        parameters: [...paginationParams],
        responses: {
          "200": { description: "A page of apartments.", content: json(pagedApartments) },
          "400": { description: "Invalid query.", content: json(errorBody) },
        },
      },
      post: {
        tags: ["Apartments"],
        summary: "Create an apartment (requires JWT)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: json(createApartmentBody) },
        responses: {
          "201": { description: "Created.", content: json(apartmentDetails) },
          "400": { description: "Validation failed / malformed JSON.", content: json(errorBody) },
          "401": { description: "Missing or invalid token.", content: json(errorBody) },
          "409": { description: "Duplicate unit number.", content: json(errorBody) },
        },
      },
    },

    "/api/apartments/search": {
      get: {
        tags: ["Apartments"],
        summary: "Search apartments (paginated)",
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Matches unit name, unit number or project.",
            example: "garden",
          },
          ...paginationParams,
        ],
        responses: {
          "200": { description: "Matching apartments.", content: json(pagedApartments) },
          "400": { description: "Invalid query.", content: json(errorBody) },
        },
      },
    },

    "/api/apartments/{id}": {
      get: {
        tags: ["Apartments"],
        summary: "Get apartment details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": { description: "Apartment details.", content: json(apartmentDetails) },
          "400": { description: "Invalid id.", content: json(errorBody) },
          "404": { description: "Not found.", content: json(errorBody) },
        },
      },
    },
  },
} as const;
