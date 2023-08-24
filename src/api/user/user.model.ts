import { Request } from "express";
export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  android_token: number;
}

export interface IAddUserReq extends Request<any, any, IUser> {}
export interface IGetUserReq extends Request<{ username: IUser["username"] }> {}
export interface IGetUserIdReq extends Request<{ id: IUser["id"] }> {}
export interface IDeleteUserReq extends Request<{ id: IUser["id"] }> {}
