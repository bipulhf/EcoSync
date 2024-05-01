import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const checkRole = (token: string, role: string): boolean => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role === role) return true;
    return false;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const extractRole = (roles: any): string[] => {
  const roleArray = roles.map((role: any) => role.role.role);
  return roleArray;
};

export const extractPermissions = (roles: any): string[] => {
  const roleArray = roles.map((role: any) =>
    role.role.permissions.map((permission: any) => permission.permission)
  );
  return [].concat(...roleArray);
};

export const getUserId = (token: string): number => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
