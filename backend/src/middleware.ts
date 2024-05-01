import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const middleware = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = jwt.verify(
        req.headers.authorization as string,
        JWT_SECRET
      ) as any;
      if (decoded.role.includes(permission)) next();
      else res.status(403).send("Access Denied");
    } catch (error) {
      res.status(403).send("Invalid Token");
    }
  };
};
