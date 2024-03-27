import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const checkRole = (token: string, role: string): boolean => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role === role) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export const getUserId = (token: string): number => {
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  return decoded.userId;
};
