import {Router} from "express";
import * as apartmentsController from "../controllers/apartments.controller.js";

const router = Router();

router.get("/", apartmentsController.getAllApartments);

router.get("/:id", apartmentsController.getApartmentById);

router.post("/", apartmentsController.createApartment);

export default router;