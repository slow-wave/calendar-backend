import { RequestHandler, Response } from "express";
import {
  IAddLogReq,
  IGetLogByDayReq,
  IGetLogByMonthReq,
  IGetLogCountReq,
  IGetLogsListReq,
  IUpdateLogReq,
} from "./log.model";
import * as LogService from "./log.service";

/**
 * Inserts a new log record based
 *
 * @param req Express Request
 * @param res Express Response
 */
export const addLog: RequestHandler = async (
  req: IAddLogReq,
  res: Response
) => {
  try {
    const result = await LogService.insertLog(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[log.controller][addLog][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new log",
    });
  }
};
/**Get log record based on user_id provided
 *
 *@param req Express Request
 *@param res Express Response
 */
export const getLogByDay = async (req: IGetLogByDayReq, res: Response) => {
  try {
    const log = await LogService.getLogByDay(
      req.params.user_id,
      req.params.day
    );
    res.status(200).json({ log });
  } catch (error) {
    console.error(
      "[log.controller][getLogByDay][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching log",
    });
  }
};
/**Get log record based on user_id provided
 *
 *@param req Express Request
 *@param res Express Response
 */
export const getLogByMonth = async (req: IGetLogByMonthReq, res: Response) => {
  try {
    const log = await LogService.getLogByMonth(
      req.params.user_id,
      req.query.year as string,
      req.query.month as string
    );
    res.status(200).json({ log });
  } catch (error) {
    console.error(
      "[log.controller][getLogByMonth][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching log",
    });
  }
};

/**Get log record list (pagination)
 *
 *@param req Express Request
 *@param res Express Response
 */
export const getLogsList: any = async (req: IGetLogsListReq, res: Response) => {
  try {
    const log = await LogService.getLogsList(
      req.params.user_id,
      Number(req.query.page)
    );
    res.status(200).json({ log });
  } catch (error) {
    console.error(
      "[log.controller][getLogsList][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching log",
    });
  }
};

/**Get log count based on year, user_id provided
 *
 *@param req Express Request
 *@param res Express Response
 */
export const getLogCount = async (req: IGetLogCountReq, res: Response) => {
  try {
    const monthCount = await LogService.getLogCount(
      req.params.user_id,
      req.params.year
    );

    let monthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let monthText in monthCount) {
      let monthInt = parseInt(monthCount[monthText].date.split("-")[1]);
      monthArray[monthInt - 1] = monthCount[monthText].count;
    }

    res.status(200).json({ monthArray });
  } catch (error) {
    console.error(
      "[log.controller][getLogCount][Error]",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching log count",
    });
  }
};

/**
 * Updates existing log record
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const updateLogById: RequestHandler = async (
  req: IUpdateLogReq,
  res: Response
) => {
  try {
    const result = await LogService.updateLog({
      ...req.body,
      id: req.params.id,
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[logs.controller][updateLogById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating log",
    });
  }
};
