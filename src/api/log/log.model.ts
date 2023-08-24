import { Request } from "express";
export interface ILog {
  count: number;
  date: any;
  id: number;
  user_id: string;
  datetime: string;
  year: string;
  month: string;
  content_title: string;
  content_main: string;
  content_image: string;
  color: string;
  page: number;
  totalCount: number;
}

export interface IAddLogReq extends Request<any, any, ILog> {}
export interface IGetLogByDayReq
  extends Request<{ user_id: ILog["user_id"]; day: ILog["datetime"] }> {}
export interface IGetLogByMonthReq
  extends Request<{
    user_id: ILog["user_id"];
    year: ILog["year"];
    month: ILog["month"];
  }> {}
export interface IGetLogsListReq
  extends Request<{
    user_id: ILog["user_id"];
    page: ILog["page"];
  }> {}

export interface IGetLogCountReq
  extends Request<{
    user_id: ILog["user_id"];
    year: ILog["datetime"];
  }> {}

export interface IUpdateLogReq extends Request<{ id: ILog["id"] }, any, ILog> {}
