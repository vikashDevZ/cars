import catchAsyncErrors from "../middleware/catchAsyncError.js";
import {
  getVehicleInfo,
  getSubModelType,
  getVehicleType,
  getAllVehicleType,
  getAllSubModelType,
  getAllVehicleInfo,
  updateVehicleStatus,
} from "../services/vehicle.service.js";
import ErrorHander from "../utils/errorhandler.js";

export const getBookingInfo = catchAsyncErrors(async (req, res, next) => {
  const { vehicleType, vehicleSubType, vehileInfo } = req.query;

  if (!vehicleType) {
    const details = await getAllVehicleType();
    if (details) return res.status(200).send({ details });
  }
  if (vehicleType && vehicleSubType) {
    const details = await getAllVehicleInfo(vehicleSubType);
    if (details) return res.status(200).send({ details });
  }
  if (vehicleType && !vehicleSubType) {
    const details = await getAllSubModelType(vehicleType);
    if (details) return res.status(200).send({ details });
  }
  res.status(200).json({ success: true });
});

export const bookVehicle = catchAsyncErrors(async (req, res, next) => {
  const { vehicleId, startDate, endDate, userId } = req.body;

  const data = await getVehicleInfo(vehicleId);

  if (new Date(startDate) > new Date(data.end_date) || new Date(endDate) < new Date(data.start_date)) {
    const data = await updateVehicleStatus(
      vehicleId,
      startDate,
      endDate,
      userId
    );

    return res.status(200).json({ success: true });
  }
  return next(new ErrorHander("Vehicle not available to booked", 404));
});
