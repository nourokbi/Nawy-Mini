import type { NextFunction, Request, Response } from "express";
import * as apartmentService from "../services/apartment.service.js";
import { 
    createApartmentSchema,
    listApartmentsSchema,
    getApartmentByIdSchema }
from "../validations/apartment.schema.js";


export async function getAllApartments(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listApartmentsSchema.parse(req.query);
    const apartments = await apartmentService.getAllApartments(query);
    res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
}

export async function getApartmentById(req: Request, res: Response, next: NextFunction) {
  try {
    // parsing the params to ensure they are valid uuid (params are)
    const params = getApartmentByIdSchema.parse(req.params);
    const apartment = await apartmentService.getApartmentById(params.id);
    // if(!apartment) {
    //   res.status(404).json({ error: "Apartment not found" });
    // }
    res.status(200).json(apartment)
  } catch (error) {
    next(error);
  }
}

export async function createApartment(req: Request, res: Response, next: NextFunction) {
  try {
    const createApartmentRequestBody = createApartmentSchema.parse(req.body);
    const createdApartment = await apartmentService.createApartment(createApartmentRequestBody);
    // if (!apartment) {
    //   res.status(409).json({
    //     error: "An apartment with the same unit number already exists",
    //   });
    //   return;
    // }
    res.status(201).json(createdApartment);
  } catch (error) {
    next(error);
  }
}