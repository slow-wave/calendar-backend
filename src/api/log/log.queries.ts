export const LogQueries = {
  AddLog: `
        INSERT INTO record (user_id, datetime, content_title, content_main, color, content_image) 
        VALUES (?, now(), ?, ?, UNHEX(?), ?);`,
  GetLogByDay: `
        SELECT id, user_id, DATE_FORMAT(datetime, "%Y-%m-%d %H:%i:%s") as datetime, content_title, content_main, HEX(color) as color
        FROM record WHERE user_id = ? and DATE(datetime) = ?;`,
  GetLogByMonth: `
        SELECT id, user_id, DATE_FORMAT(datetime, "%Y-%m-%d %H:%i:%s") as datetime, content_title, content_main, HEX(color) as color,content_image
        FROM record 
        WHERE user_id = ? and YEAR(datetime) = ? and MONTH(datetime) = ?;`,
  GetLogsList: `
        SELECT id, user_id, DATE_FORMAT(datetime, "%Y-%m-%d %H:%i:%s") as datetime, content_title, content_main, HEX(color) as color,content_image
        FROM record 
        WHERE user_id = ?
        ORDER BY datetime DESC
        LIMIT ?, ?;`,
  GetLogsListCount: `
        SELECT count(*) as totalCount
        FROM record
        WHERE user_id = ?;`,
  GetLogCount: `
        SELECT date_format(datetime, '%Y-%m') date, count(*) count
        FROM record
        WHERE user_id = ? and year(datetime) = ?
        GROUP BY date_format(datetime, '%Y-%m');`,
  UpdateLogById: `
        UPDATE record
        SET content_title = ?, content_main = ?, color = UNHEX(?), content_image = ?
        WHERE id = ?`,
};
