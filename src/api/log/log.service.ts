import { execute } from "./../utils/mysql.connector";
import { LogQueries } from "./log.queries";
import { ILog } from "./log.model";

/**
 * adds a new active log record
 */
export const insertLog = async (log: ILog) => {
  const result = await execute<{ affectedRows: number }>(LogQueries.AddLog, [
    log.user_id,
    log.content_title,
    log.content_main,
    log.color,
    log.content_image,
  ]);
  return result.affectedRows > 0;
};
/**
 * gets a log based on day provided
 */
export const getLogByDay = async (
  user_id: ILog["user_id"],
  day: ILog["datetime"]
) => {
  return execute<ILog[]>(LogQueries.GetLogByDay, [user_id, day]);
};
/**
 * gets a log based on month provided
 */
export const getLogByMonth = async (
  user_id: ILog["user_id"],
  year: ILog["year"],
  month: ILog["month"]
) => {
  return execute<ILog[]>(LogQueries.GetLogByMonth, [user_id, year, month]);
};

/**
 * gets logs list(pagination)
 */
export const getLogsList = async (
  user_id: ILog["user_id"],
  page: ILog["page"]
) => {
  const limit = 5;
  const [totalCount] = await execute<ILog[]>(LogQueries.GetLogsListCount, [
    user_id,
  ]);
  const logList = await execute<ILog[]>(LogQueries.GetLogsList, [
    user_id,
    (page - 1) * 5,
    page * limit,
  ]);
  const maxPage = Math.ceil(totalCount?.totalCount / limit);
  const prevPage = page === 1 ? null : `/${user_id}/list?page=${page - 1}`;
  const nextPage = page >= maxPage ? null : `/${user_id}/list?page=${page + 1}`;
  const pageInfo = { ...totalCount, page, limit, prevPage, nextPage, logList };

  return pageInfo;
};

/**
 * gets a log based on year, user_id provided
 */
export const getLogCount = async (
  user_id: ILog["user_id"],
  year: ILog["datetime"]
) => {
  return execute<ILog[]>(LogQueries.GetLogCount, [user_id, year]);
};

/**
 * updates log information based on the id provided
 */
export const updateLog = async (log: ILog) => {
  const result = await execute<{ affectedRows: number }>(
    LogQueries.UpdateLogById,
    [log.content_title, log.content_main, log.color, log.content_image, log.id]
  );
  return result.affectedRows > 0;
};
