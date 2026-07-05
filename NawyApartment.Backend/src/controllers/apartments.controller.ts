import type { Request, Response } from "express";
import * as apartmentService from "../services/apartment.service.js";
import {
  createApartmentSchema,
  paginationSchema,
  searchApartmentsSchema,
  getApartmentByIdSchema,
} from "../validations/apartment.schema.js";

// Get all apartments with optional pagination
export async function getAllApartments(req: Request, res: Response) {
  const query = paginationSchema.parse(req.query);
  const apartments = await apartmentService.getAllApartments(query);
  res.status(200).json(apartments);
}

// Search apartments based on query parameters
export async function searchApartments(req: Request, res: Response) {
  const query = searchApartmentsSchema.parse(req.query);
  const apartments = await apartmentService.searchApartments(query);
  res.status(200).json(apartments);
}
// Get a specific apartment by its ID
export async function getApartmentById(req: Request, res: Response) {
  const params = getApartmentByIdSchema.parse(req.params);
  const apartment = await apartmentService.getApartmentById(params.id);
  res.status(200).json(apartment);
}
// Create a new apartment
export async function createApartment(req: Request, res: Response) {
  const body = createApartmentSchema.parse(req.body);
  const createdApartment = await apartmentService.createApartment(body);
  res.status(201).json(createdApartment);
}
