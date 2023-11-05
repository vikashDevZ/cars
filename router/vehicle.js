import { Router } from "express";
import { getBookingInfo, bookVehicle } from "../controller/vehicle.js";

const router = Router();

router.route("/search").get(getBookingInfo);
router.route("/book").post(bookVehicle);

export default router;
