import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import apartmentsRouter from "./routes/apartments.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import { openApiDocument } from "./docs/openapi.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the Next.js frontend to call the API cross-origin (sends the
// Authorization header on login/create). Origin configurable via env.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  }),
);

app.use(express.json());

// Interactive API documentation (Swagger UI)
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument as object),
);
app.use("/api/auth", authRouter);
app.use("/api/apartments", apartmentsRouter);

// Any request that didn't match a route above -> 404
app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
