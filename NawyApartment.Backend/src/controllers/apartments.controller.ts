import type { NextFunction, Request, Response } from "express";
import * as apartmentService from "../services/apartment.service.js";
import {
    createApartmentSchema,
    paginationSchema,
    searchApartmentsSchema,
    getApartmentByIdSchema }
from "../validations/apartment.schema.js";


export async function getAllApartments(req: Request, res: Response, next: NextFunction) {
  try {
    const query = paginationSchema.parse(req.query);
    const apartments = await apartmentService.getAllApartments(query);
    res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
}

export async function searchApartments(req: Request, res: Response, next: NextFunction) {
  try {
    const query = searchApartmentsSchema.parse(req.query);
    const apartments = await apartmentService.searchApartments(query);
    res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
}

export async function getApartmentById(req: Request, res: Response, next: NextFunction) {
  try {
    const params = getApartmentByIdSchema.parse(req.params);
    const apartment = await apartmentService.getApartmentById(params.id);
    res.status(200).json(apartment)
  } catch (error) {
    next(error);
  }
}

export async function createApartment(req: Request, res: Response, next: NextFunction) {
  try {
    const createApartmentRequestBody = createApartmentSchema.parse(req.body);
    const createdApartment = await apartmentService.createApartment(createApartmentRequestBody);
    res.status(201).json(createdApartment);
  } catch (error) {
    next(error);
  }
}