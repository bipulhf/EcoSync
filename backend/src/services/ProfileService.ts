import { hashSync } from "bcrypt";
import { getUserById, updateUserById } from "../repository/UserRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export const getLoggedInUserService = async (currentUserId: number) => {
  try {
    const user = await getUserById(currentUserId);
    const roles = user?.roles.map((role: any) => role.role);
    user.roles = roles;
    if (!user) throw new ResourceNotFound("User", currentUserId);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateLoggedInUserService = async ({
  userId,
  first_name,
  last_name,
  email,
  mobile,
  profile_photo,
  password,
}: any) => {
  try {
    const oldUser = await getUserById(userId, true);
    if (!oldUser) throw new ResourceNotFound("User", userId);

    password = password ? hashSync(password, 10) : oldUser.password;
    profile_photo = profile_photo ? profile_photo : oldUser.profile_photo;
    const [user] = await updateUserById({
      userId,
      first_name,
      last_name,
      email,
      profile_photo,
      password,
      mobile,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
