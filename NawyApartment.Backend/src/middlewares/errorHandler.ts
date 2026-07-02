import type { NextFunction, Request, Response } from "express"
import { ZodError, z } from "zod";


export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const details = z.treeifyError(err)
    return res.status(400).json({
      error: "Validation failed",
      details
    });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}