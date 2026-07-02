import express from "express";
import apartmentsRouter from "./routes/apartments.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/apartments", apartmentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}) 