import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Heeeeeeeeey");
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

router.post("/", (req, res) => {
  res.status(201).json(req.body);
});


export default router;