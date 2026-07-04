import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validations/auth.schema.js";
import * as authService from "../services/auth.service.js";

export function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const isValidCredentials = authService.verifyCredentials(email, password);
    if (!isValidCredentials) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = authService.generateJWT(email);
    res.status(200).json({ token });
    
  } catch (error) {
    next(error);
  }
}
