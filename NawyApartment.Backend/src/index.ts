import express from "express";
import apartmentsRouter from "./routes/apartments.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/apartments", apartmentsRouter);

// Any request that didn't match a route above -> 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}) 