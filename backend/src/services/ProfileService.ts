import { hashSync } from "bcrypt";
import { getUserById, updateUserById } from "../repository/UserRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export const getLoggedInUserService = async (currentUserId: number) => {
  try {
    const user = await getUserById(currentUserId);
    if (!user) throw new ResourceNotFound("User", currentUserId);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateLoggedInUserService = async ({
  currentUserId,
  first_name,
  last_name,
  email,
  mobile,
  profile_photo,
  password,
}: any) => {
  try {
    const oldUser = await getUserById(currentUserId, true);
    if (!oldUser) throw new ResourceNotFound("User", currentUserId);

    password = password ? hashSync(password, 10) : oldUser.password;
    profile_photo = profile_photo ? profile_photo : oldUser.profile_photo;
    const user = await updateUserById({
      currentUserId,
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
