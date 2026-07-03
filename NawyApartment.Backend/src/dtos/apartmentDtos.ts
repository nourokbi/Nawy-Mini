import type { Apartment } from "../generated/prisma/client.js";

// This DTO is used for apartment listing
export type apartmentDto = {
  id: string;
  unitNumber: string;
  unitName: string;
  project: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string | null;
  address: string | null;
};

// This DTO is used for apartment details
export type apartmentDetailsDto = {
  id: string;
  unitNumber: string;
  unitName: string;
  project: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string | null;
  address: string | null;
};

// Maps a database Apartment entity to the listing DTO.
export function toApartmentDto(apartment: Apartment): apartmentDto {
  return {
    id: apartment.id,
    unitNumber: apartment.unitNumber,
    unitName: apartment.unitName,
    project: apartment.project,
    price: apartment.price,
    bedrooms: apartment.bedrooms,
    bathrooms: apartment.bathrooms,
    area: apartment.area,
    imageUrl: apartment.imageUrl,
    address: apartment.address,
  };
}

// Maps a database Apartment entity to the details DTO (adds description).
export function toApartmentDetailsDto(
  apartment: Apartment,
): apartmentDetailsDto {
  return {
    ...toApartmentDto(apartment),
    description: apartment.description,
  };
}
