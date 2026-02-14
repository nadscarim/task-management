import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@/generated/prisma/enums";

const JWT_CONFIG = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "your-access-secret",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
} as const;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_CONFIG.ACCESS_SECRET) as {
      userId: string;
      email: string;
      role: Role;
    };

    req.token = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    console.log("✅ req.token set:", req.token);

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Authentication failed" });
  }
};

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};
