import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const middleware = (permission: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = (
        (req.headers.authorization as string) || req.cookies.jwt
      ).split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      permission.forEach((perm) => {
        if (decoded.permissions.includes(perm)) return next();
      });
      return res.status(403).json({ message: "Access Denied" });
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};
