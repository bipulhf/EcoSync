import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import { createUser } from "../services/auth";
import { getLoggedInUser, updateLoggedInUser } from "../services/profile";
import { getAllUsers, getUser, deleteUser, updateUser } from "../services/user";

const userRouter = Router();
userRouter.post(
  "/users",
  middleware([rolePermissions.CREATE_USER]),
  createUser
);
userRouter.post(
  "/auth/create",
  middleware([rolePermissions.CREATE_USER]),
  createUser
);

userRouter.get(
  "/users",
  middleware([rolePermissions.READ_USER_ALL]),
  getAllUsers
);
userRouter.get(
  "/users/:id",
  middleware([rolePermissions.READ_USER_ALL]),
  getUser
);
userRouter.delete(
  "/users/:id",
  middleware([rolePermissions.DELETE_USER]),
  deleteUser
);
userRouter.put(
  "/users/:id",
  middleware([rolePermissions.UPDATE_USER_ALL]),
  updateUser
);
userRouter.get(
  "/profile",
  middleware([rolePermissions.READ_USER_SELF]),
  getLoggedInUser
);
userRouter.put(
  "/profile",
  middleware([rolePermissions.UPDATE_USER_SELF]),
  updateLoggedInUser
);
export default userRouter;
