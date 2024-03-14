import "dotenv/config";
import * as process from "process";
import {SequelizeOptions} from "sequelize-typescript";

export default () => ({
  port: Number(process.env.PORT) || 3001,
});

export const databaseConfig: SequelizeOptions = {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 25434,
  database: process.env.DB_NAME || "db_name",
  username: process.env.DB_USERNAME || "db_user",
  password: process.env.DB_PASSWORD || "db_password",
}
