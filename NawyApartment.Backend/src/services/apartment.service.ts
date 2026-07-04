import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import type {
  CreateApartmentBody,
  ListAllApartmentsQuery,
} from "../validations/apartment.schema.js";
import {
  toApartmentDto,
  toApartmentDetailsDto,
} from "../dtos/apartmentDtos.js";

export async function getAllApartments(query?: ListAllApartmentsQuery) {
  const { search, page = 1, limit = 9 } = query ?? {};

  const where: Prisma.ApartmentWhereInput = {};

  if (search) {
    where.OR = [
      { unitName: { contains: search, mode: "insensitive" } },
      { unitNumber: { contains: search, mode: "insensitive" } },
      { project: { contains: search, mode: "insensitive" } },
    ];
  }

  // Run the page query and the total count in parallel.
  const [apartments, total] = await Promise.all([
    prisma.apartment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.apartment.count({ where }),
  ]);

  return {
    data: apartments.map(toApartmentDto),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getApartmentById(id: string) {
  const apartment = await prisma.apartment.findUniqueOrThrow({
    where: { id },
  });
  return toApartmentDetailsDto(apartment);
}

export async function createApartment(body: CreateApartmentBody) {
  // Build the apartment record manually, then hand it to the database
  const apartment: Prisma.ApartmentCreateInput = {
    unitName: body.unitName,
    unitNumber: body.unitNumber,
    project: body.project,
    description: body.description,
    price: body.price,
    bedrooms: body.bedrooms,
    bathrooms: body.bathrooms,
    area: body.area,
    imageUrl: body.imageUrl ?? null,
    address: body.address ?? null,
  };

  // return the created apartment or throw an error if the creation fails.
  const created = await prisma.apartment.create({ data: apartment });
  return toApartmentDetailsDto(created);
}
