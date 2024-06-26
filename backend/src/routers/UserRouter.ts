import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getLoggedInUserService,
  updateLoggedInUserService,
} from "../services/ProfileService";
import {
  getAllUsersService,
  getUserService,
  deleteUser,
  updateUserService,
  createUserService,
  getAllLandfillStsLocationService,
  getAllInformationService,
} from "../services/UserService";
import getErrorType from "../error";
import { getUserId } from "../helpers/getRole";

const userRouter = Router();
const emailPattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

userRouter.post(
  ["/users", "/auth/create"],
  middleware([rolePermissions.CREATE_USER]),
  async (req, res) => {
    try {
      let {
        first_name,
        last_name,
        email,
        mobile,
        roles,
        sts_id,
        landfill_id,
        contractor_id,
      } = req.body;
      const message = await createUserService({
        first_name,
        last_name,
        email,
        mobile,
        roles,
        sts_id,
        landfill_id,
        contractor_id,
      });
      return res.status(201).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

userRouter.get(
  "/users",
  middleware([rolePermissions.READ_USER_ALL]),
  async (req, res) => {
    try {
      const users = await getAllUsersService();
      return res.status(200).json(users);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
userRouter.get(
  "/users/:id",
  middleware([rolePermissions.READ_USER_ALL]),
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await getUserService(userId);
      return res.status(200).json(user);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

userRouter.delete(
  "/users/:id",
  middleware([rolePermissions.DELETE_USER]),
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const message = await deleteUser(userId);
      return res.status(200).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

userRouter.put(
  "/users/:id",
  middleware([rolePermissions.UPDATE_USER_ALL]),
  async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const {
        first_name,
        last_name,
        email,
        profile_photo,
        mobile,
        roles,
        sts_id,
        landfill_id,
      } = req.body;
      const adminId = res.locals.userId;
      if (userId == adminId) {
        return res.status(403).json({
          message: "Update your info from your profile",
        });
      }
      const user = await updateUserService({
        userId,
        first_name,
        last_name,
        email,
        profile_photo,
        mobile,
        roles,
        sts_id: +sts_id,
        landfill_id: +landfill_id,
      });
      return res.status(201).json(user);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

userRouter.get(
  "/profile",
  middleware([rolePermissions.READ_USER_SELF, rolePermissions.READ_USER_ALL]),
  async (req, res) => {
    try {
      const token = (req.headers.authorization as string).split(" ")[1];
      let currentUserId = getUserId(token);
      const user = await getLoggedInUserService(currentUserId);
      return res.status(200).json(user);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
userRouter.put(
  "/profile",
  middleware([
    rolePermissions.UPDATE_USER_SELF,
    rolePermissions.UPDATE_USER_ALL,
  ]),
  async (req, res) => {
    try {
      const { first_name, last_name, email, mobile, profile_photo, password } =
        req.body;
      if (!first_name || !last_name || !email || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
      } else if (emailPattern.test(email) == false) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const userId = res.locals.userId;
      const user = await updateLoggedInUserService({
        userId,
        first_name,
        last_name,
        email,
        mobile,
        profile_photo,
        password,
      });
      return res.status(201).json(user);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

userRouter.get("/all-info", async (req, res) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    let currentUserId = getUserId(token);
    if (!currentUserId)
      return res.status(403).json({ message: "User not found." });
    const information = await getAllInformationService();
    return res.status(200).json(information);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

userRouter.get("/get-landfill-sts-location", async (req, res) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    let currentUserId = getUserId(token);
    if (!currentUserId)
      return res.status(403).json({ message: "User not found." });
    const information = await getAllLandfillStsLocationService();
    return res.status(200).json(information);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

export default userRouter;
