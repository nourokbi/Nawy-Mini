import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import apartmentsRouter from "./routes/apartments.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import { openApiDocument } from "./docs/openapi.js";

const app = express();
const PORT = process.env.PORT || 3001;
// Public, browser-facing URL. In Docker it's the host port (3101); locally it
// falls back to the container/local port so dev logs stay correct.
const PUBLIC_URL = process.env.PUBLIC_URL ?? `http://localhost:${PORT}`;

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
  console.log("Backend API is running");
  console.log(`   → API:      ${PUBLIC_URL}/api`);
  console.log(`   → API docs: ${PUBLIC_URL}/api/docs`);
});
