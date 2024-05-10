import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { permissions } from "./helpers/permissions";

const JWT_SECRET = process.env.JWT_SECRET!;

export const middleware = (permission: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        (req.headers.authorization as string).split(" ")[1] || req.cookies.jwt;
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      let flag = false;
      permission.forEach((perm) => {
        console.log(perm);
        if (decoded.permissions.includes(perm)) {
          res.locals.permission = permissions;
          res.locals.userId = decoded.userId;
          flag = true;
        }
      });
      if (flag) return next();
      return res.status(403).json({ message: "Access Denied" });
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};
