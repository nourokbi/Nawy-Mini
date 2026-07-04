import { Router } from "express";
import * as apartmentsController from "../controllers/apartments.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

router.get("/", apartmentsController.getAllApartments);
router.get("/search", apartmentsController.searchApartments);
router.get("/:id", apartmentsController.getApartmentById);
router.post("/", requireAuth, apartmentsController.createApartment);

export default router;
