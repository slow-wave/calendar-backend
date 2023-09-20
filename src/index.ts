import express, { Express, Request, Response } from "express";
import * as MySQLConnector from "./api/utils/mysql.connector";
import cors from "cors";
import routes from "./api/routes";

const app: Express = express();
const port = 4000;

// create MySQL database pool
MySQLConnector.init();

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*", // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);

//Routes
app.use("/api/", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
