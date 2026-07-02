import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import type { CreateApartmentBody, ListAllApartmentsQuery, GetApartmentByIdParams } from "../validations/apartment.schema.js"

export async function getAllApartments(query?: ListAllApartmentsQuery) {
  const { search } = query || {};

  const where: Prisma.ApartmentWhereInput = {} 

  if(search){ 
    where.OR = [
      { unitName: { contains: search, mode: "insensitive" } },
      { unitNumber: { contains: search, mode: "insensitive" } },
      { project: { contains: search, mode: "insensitive" } },
    ]
  }  
  return await prisma.apartment.findMany({
    where,
  });
}

export async function getApartmentById(id: string) {
  return await prisma.apartment.findUnique({
    where: { id },
  });
}

export async function createApartment(body: CreateApartmentBody) {
  return await prisma.apartment.create({
    data: {
      ...body,
      // Set optional fields to null if they are not provided
      // instead of passing undefined to the database (Restricted by TS 'exactOptionalPropertyTypes' option)
      imageUrl: body.imageUrl ?? null,
      address: body.address ?? null,
    },
  });
}
