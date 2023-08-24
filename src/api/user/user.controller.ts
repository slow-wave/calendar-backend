import { Request, RequestHandler, Response } from "express";
import {
  IGetUserIdReq,
  IAddUserReq,
  IGetUserReq,
  IDeleteUserReq,
} from "./user.model";
import * as UserService from "./user.service";

/**Get user record based on id provided
 *
 *@param req Express Request
 *@param res Express Response
 */

export const getUserByName = async (req: IGetUserReq, res: Response) => {
  try {
    const user = await UserService.getUserByName(req.params.username);
    res.status(200).json({ user });
  } catch (error) {
    console.error(
      "[user.controller][getUserByName][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching user",
    });
  }
};

/**Get user record based on id provided
 *
 *@param req Express Request
 *@param res Express Response
 */

export const deleteUser: any = async (req: IDeleteUserReq, res: Response) => {
  try {
    await UserService.deleteUser(req.body.user_id);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(
      "[user.controller][deleteUser][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when delete user",
    });
  }
};
