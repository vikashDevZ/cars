import dotenv from 'dotenv'
import Sequelize from "sequelize";
dotenv.config();

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PSWD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);
