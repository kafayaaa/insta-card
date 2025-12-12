import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export interface AuthRequest extends Request {
  userId?: string;
}

interface JwtPayloadUser extends jwt.JwtPayload {
  userId: string;
}


export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("Authorization header:", req.headers.authorization);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    // FIX: casting aman + JWT_SECRET tidak mungkin undefined
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadUser;

    if (!decoded.userId) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("TOKEN ERROR:", error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
