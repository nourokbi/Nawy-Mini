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

  // Run the page query and the total count in one round-trip.
  const [apartments, total] = await prisma.$transaction([
    prisma.apartment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" }, // deterministic order is required for paging
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
  // Reject duplicates: an apartment with the same unit number
  // const apartmentExists = await prisma.apartment.findUnique({
  //   where: { unitNumber: body.unitNumber },
  // });

  // // Already exists — signal the conflict to the controller by returning null
  // if (apartmentExists) {
  //   return null;
  // }

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

  const created = await prisma.apartment.create({ data: apartment });
  return toApartmentDetailsDto(created);
}
