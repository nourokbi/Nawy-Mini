import { verifyJWT } from "../services/auth.service.js";
import type { NextFunction, Request, Response } from "express";

// verify the jwt token in the Authorization header
// and allow the request to proceed if valid,
//  otherwise return 401 Unauthorized
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || !verifyJWT(token)) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Token is valid — allow the request through to the controller.
  next();
}
