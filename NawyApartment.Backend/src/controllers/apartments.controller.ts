import type { NextFunction, Request, Response } from "express"
import * as apartmentService from "../services/apartment.service.js"
import { createApartmentSchema, listApartmentsSchema, getApartmentByIdSchema } from "../validations/apartment.schema.js"


export async function getAllApartments(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listApartmentsSchema.parse(req.query);
    const apartments = await apartmentService.getAllApartments(query);
    res.status(200).json(apartments)
  } catch (error) {
    next(error)
  }
}

export async function getApartmentById(req: Request, res: Response, next: NextFunction) {
  const params = getApartmentByIdSchema.parse(req.params);
  const apartment = await apartmentService.getApartmentById(params.id);
  if(!apartment) {
    res.status(404).json({ error: "Apartment not found" });
  }
  res.status(200).json(apartment)
}

export async function createApartment(req: Request, res: Response, next: NextFunction) {
  try {
    const body = createApartmentSchema.parse(req.body);
    const apartment = await apartmentService.createApartment(body);
    res.status(201).json(apartment)
  } catch (error) {
    next(error)
  }
}