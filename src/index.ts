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
  cors({ origin: "https://daily-diary-happy.netlify.app", credentials: true })
);

//Routes
app.use("/api/", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
