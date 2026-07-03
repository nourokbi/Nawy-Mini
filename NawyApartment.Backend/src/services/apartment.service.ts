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
  const { search } = query || {};

  const where: Prisma.ApartmentWhereInput = {};

  if (search) {
    where.OR = [
      { unitName: { contains: search, mode: "insensitive" } },
      { unitNumber: { contains: search, mode: "insensitive" } },
      { project: { contains: search, mode: "insensitive" } },
    ];
  }
  const apartments = await prisma.apartment.findMany({
    where,
  });
  return apartments.map(toApartmentDto);
}

export async function getApartmentById(id: string) {
  const apartment = await prisma.apartment.findUniqueOrThrow({
    where: { id },
  });
  return apartment ? toApartmentDetailsDto(apartment) : null;
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
