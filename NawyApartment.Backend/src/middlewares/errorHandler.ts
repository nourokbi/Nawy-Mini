import type { NextFunction, Request, Response } from "express"
import { ZodError, z } from "zod";
import { Prisma } from "../generated/prisma/client.js";


export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const details = z.treeifyError(err)
    return res.status(400).json({
      error: "Validation failed",
      details
    });
  }

  // Prisma unique constraint violation (e.g. duplicate unitNumber) -> 409 Conflict
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({
      error: "A field with the same unique value already exists",
    });
  }

  // Prisma "record required but not found" (findUniqueOrThrow/update/delete) -> 404
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({
      error: "Not found",
    });
  }

  // Malformed JSON body (express.json parser fails before the controller) -> 400
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Malformed JSON in request body",
    });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}