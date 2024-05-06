import { db } from "../drizzle/db";
import { hashSync } from "bcrypt";
import { userRole } from "../globals";
import { mailOptions, mailTransporter } from "../helpers/mailTransporter";
import { generateRandomPassword } from "./AuthService";
import { InvalidType } from "../errors/InvalidType";
import {
  deleteUserById,
  getAllUsersWithRoles,
  getUserByEmail,
  getUserById,
  getUserByIdWithRole,
  createUser,
  updateUserAndRoleById,
} from "../repository/UserRepository";
import { getStsById } from "../repository/StsRepository";
import { getLandfillById } from "../repository/LandfillRepository";
import { AlreadyExists } from "../errors/AlreadyExists";
import { ResourceNotFound } from "../errors/ResourceNotFound";

const emailPattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const createUserService = async ({
  first_name,
  last_name,
  email,
  mobile,
  roles,
  sts_id,
  landfill_id,
}: any) => {
  try {
    (sts_id = +sts_id), (landfill_id = +landfill_id);

    if (!first_name || !last_name || !email || !mobile || !roles)
      throw new Error("Missing required fields");
    else if (mobile.length != 11 || mobile[0] !== "0" || mobile[1] !== "1")
      throw new InvalidType("Mobile Number");
    else if (emailPattern.test(email) == false) throw new InvalidType("Email");
    else if (roles.includes(userRole.STS_MANAGER) && !sts_id)
      throw new Error("STS ID is required for the role");
    else if (roles.includes(userRole.LANDFILL_MANAGER) && !landfill_id)
      throw new Error("Landfill ID is required for the role");

    const password = generateRandomPassword(10);
    const present = await db.transaction(async (tx: any) => {
      const user = await getUserByEmail(email, false, tx);
      let sts, landfill;
      if (sts_id) sts = await getStsById(sts_id, tx);
      if (landfill_id) landfill = await getLandfillById(landfill_id, tx);
      return { user, sts, landfill };
    });

    if (present.user) throw new AlreadyExists("User");
    else if (!present.sts && sts_id) throw new ResourceNotFound("STS", sts_id);
    else if (!present.landfill && landfill_id)
      throw new ResourceNotFound("Landfill", landfill_id);

    const newUser = await createUser({
      first_name,
      last_name,
      email,
      password: hashSync(password, 10),
      mobile,
      roles,
      sts_id,
      landfill_id,
    });

    const mail = {
      ...mailOptions,
      to: email,
      subject: "Welcome to EcoSync",
      html: `<p>Hi ${newUser.first_name}!</p><p>System Admin has created an account for you on EcoSync.</p><p>Please login with the credientials below and reset the password right after you logging in.</p><p>Email: ${newUser.email}</p><p>Password: <b>${password}</b></p>`,
    };

    try {
      await mailTransporter.sendMail(mail);
    } catch (e) {
      throw new Error("Error sending email");
    }
    return { message: "User created successfully" };
  } catch (e) {
    throw e;
  }
};
export const getAllUsersService = async () => {
  try {
    const users = await getAllUsersWithRoles();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
export const getUserService = async (user_id: number) => {
  try {
    const user = await getUserByIdWithRole(user_id);
    if (!user) throw new ResourceNotFound("User", user_id);
    return user;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (user_id: number) => {
  try {
    const existingUser = await getUserById(user_id);
    if (!existingUser) throw new ResourceNotFound("User", user_id);
    await deleteUserById(user_id);
    return { message: "Deleted user successfully" };
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

export const updateUserService = async ({
  userId,
  first_name,
  last_name,
  email,
  profile_photo,
  mobile,
  roles,
  sts_id,
  landfill_id,
}: any) => {
  try {
    const existingUser = await getUserById(userId, true);
    if (!existingUser) throw new ResourceNotFound("User", userId);

    if (sts_id) {
      const sts = await getStsById(sts_id);
      if (!sts) throw new ResourceNotFound("STS", sts_id);
    } else if (landfill_id) {
      const landfill = await getLandfillById(landfill_id);
      if (!landfill) throw new ResourceNotFound("Landfill", landfill_id);
    }
    profile_photo = profile_photo ? profile_photo : existingUser.profile_photo;
    const updatedUser = await updateUserAndRoleById({
      userId,
      first_name,
      last_name,
      email,
      profile_photo,
      mobile,
      roles,
      sts_id,
      landfill_id,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};
