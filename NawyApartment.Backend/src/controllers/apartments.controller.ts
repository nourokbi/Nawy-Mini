import type { NextFunction, Request, Response } from "express"
// import { createApartmentSchema } from "../validations/apartment.schema.js"


export async function getAllApartments(req: Request, res: Response, next: NextFunction) {
  res.json({ message: "Get all apartments" })

}

export async function getApartmentById(req: Request, res: Response, next: NextFunction) {
  res.json({ id: req.params.id })
}

export async function createApartment(req: Request, res: Response, next: NextFunction) {
  res.status(201).json(req.body)
}