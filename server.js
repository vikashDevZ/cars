import dotenv from  "dotenv"
import express from "express";
import http from "http";
import cors from "cors";
import vehicleRouter from "./router/vehicle.js";
import errorMiddleware from "./middleware/error.js";

dotenv.config();

const app = express();
const httpServer = new http.Server(app);
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/vehicle", vehicleRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Cars Rent 🦄🌈✨👋🌎🌍🌏✨🌈🦄");
});
app.use(errorMiddleware);

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
