import * as dotenv from "dotenv";
import { IUser } from "../user/user.model";
import { execute } from "./../utils/mysql.connector";
import { UserQueries } from "../user/user.queries";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { serviceReturnForm } from "../src/modules/service-modules";

// sign up
const signUpService = async (
  email: string,
  password: string,
  username: string
) => {
  const returnForm: serviceReturnForm = {
    status: 500,
    message: "server error",
    responseData: {},
  };
  // * Validate if email already exists
  let isEmailExist = false;
  await execute<IUser[]>(UserQueries.GetUserByEmail, [email])
    .then((data) => {
      if (data.length) {
        isEmailExist = true;
        returnForm.status = 400;
        returnForm.message = "Email already exist";
      }
    })
    .catch((e) => {
      console.log(e);
      returnForm.status = 500;
      returnForm.message = "Server Error";
      return;
    });

  // * Create User only when email not exists
  if (!isEmailExist) {
    dotenv.config();
    const TOKEN_KEY = process.env.TOKEN_KEY || "";

    // * Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, TOKEN_KEY, {
      expiresIn: "20h",
    });
    await execute<{
      android_token: any;
      affectedRows: number;
    }>(UserQueries.AddUser, [
      username || "",
      encryptedPassword || "",
      email || "",
      token || "",
    ])
      .then((data) => {
        returnForm.status = 200;
        returnForm.message = "SignUp Success";
        returnForm.responseData = { token: data.android_token };
      })
      .catch((e) => {
        console.log(e);
        returnForm.status = 500;
        returnForm.message = "Server Error";
      });
  }
  return returnForm;
};

// login
const loginService = async (email: string, password: string) => {
  const returnForm: serviceReturnForm = {
    status: 500,
    message: "server error",
    responseData: {},
  };
  await execute<IUser[]>(UserQueries.GetUserByEmail, [email])
    .then(
      async (data) => {
        // * Validate if email already exists
        if (data) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            data[0].password
          );
          // * Validate if password is correct
          if (isPasswordCorrect) {
            dotenv.config();
            const TOKEN_KEY = process.env.TOKEN_KEY || "";

            // * Encrypt user password
            let encryptedPassword = await bcrypt.hash(password, 10);
            const token = jwt.sign({ email }, TOKEN_KEY, {
              expiresIn: "20h",
            });
            returnForm.status = 200;
            returnForm.message = "Login Success";
            returnForm.responseData = {
              id: data[0].id,
              token: token,
            };
          } else {
            returnForm.status = 400;
            returnForm.message = "Wrong password";
          }
        } else {
          returnForm.status = 400;
          returnForm.message = "Wrong email";
        }
      },
      (e) => {
        throw e;
      }
    )
    .catch((e) => {
      console.log(e);
      returnForm.status = 400;
      returnForm.message = "Server Error";
    });
  return returnForm;
};

export { signUpService, loginService };
