import jwt from "jsonwebtoken";

export function verifyCredentials(email: string, password: string): boolean {
  const validEmail = process.env.AUTH_EMAIL;
  const validPassword = process.env.AUTH_PASSWORD;

  return email === validEmail && password === validPassword;
}

export function generateJWT(email: string): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined in the environment variables.");
  }

  const payload = { email };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  return token;
}

export function verifyJWT(token: string | undefined): boolean {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || !token) {
    throw new Error("Invalid operation: check your credentials");
  }
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}
