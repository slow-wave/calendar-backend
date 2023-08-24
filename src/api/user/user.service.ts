import { execute } from "./../utils/mysql.connector";
import { UserQueries } from "./user.queries";
import { IUser } from "./user.model";
import bcrypt from "bcrypt";

/**
 * gets a user based on username provided
 */
export const getUserByName = async (username: IUser["username"]) => {
  return execute<IUser[]>(UserQueries.GetUserByName, [username]);
};

/**
 * gets a user based on ID provided
 */
export const getUserById = async (id: IUser["id"]) => {
  return execute<IUser[]>(UserQueries.GetUserById, [id]);
};

/**
 * gets a user based on Email provided
 */
export const getUserByEmail = async (email: IUser["email"]) => {
  return execute<IUser[]>(UserQueries.GetUserByEmail, [email]);
};

/**
 * delete user
 */
export const deleteUser = async (id: IUser["id"]) => {
  return execute<IUser[]>(UserQueries.DeleteUser, [id]);
};
