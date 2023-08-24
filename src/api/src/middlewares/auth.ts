import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { IUser } from "./../../user/user.model";
import { execute } from "./../../utils/mysql.connector";
import { UserQueries } from "../../user/user.queries";

interface decodedData extends Object {
  email: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: 403,
      message: "A token is required for authentication",
    });
  }
  try {
    const TOKEN_KEY = process.env.TOKEN_KEY || "";
    const { email } = jwt.verify(token, TOKEN_KEY) as decodedData;

    let user;
    await execute<IUser[]>(UserQueries.GetUserByEmail, [email])
      .then((data) => {
        user = data;
      })
      .catch((e) => {
        throw e;
      });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).send({ status: 401, message: "Invalid token" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({ status: 401, message: "Invalid token" });
  }
};
