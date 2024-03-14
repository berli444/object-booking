import "dotenv/config";
import * as process from "process";

export default () => ({
  port: Number(process.env.PORT) || 3001,
});
