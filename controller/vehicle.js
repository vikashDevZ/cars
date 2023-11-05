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
import {
  bookVehicleSchema,
  VehicleQuerySchema,
} from "../validation/vehicleValidation.js";

export const getBookingInfo = catchAsyncErrors(async (req, res, next) => {
  const { error, value } = VehicleQuerySchema.validate(req.query);
  if (error) {
    console.log("error", error);
    return next(new ErrorHander(JSON.stringify(error.details), 400));
  }

  const { vehicleType, vehicleSubType } = value;

  if (Object.keys(req.query).length === 0) {
    const details = await getAllVehicleType();
    if (details) return res.status(200).send({ details });
  }
  if (vehicleType && !vehicleSubType) {
    const details = await getAllSubModelType(vehicleType);
    if (details) return res.status(200).send({ details });
  }
  if (vehicleSubType) {
    const details = await getAllVehicleInfo(vehicleSubType);
    if (details) return res.status(200).send({ details });
  }
  res.status(200).json({ success: true });
});

export const bookVehicle = catchAsyncErrors(async (req, res, next) => {
  const { error, value } = bookVehicleSchema.validate(req.body);

  if (error) {
    console.log(error);
    return next(new ErrorHander(JSON.stringify(error.details), 400));
  }

  const { vehicleId, startDate, endDate, firstName, lastName } = value;
  const vehicleData = await getVehicleInfo(vehicleId);

  if (
    !vehicleData.booked &&
    new Date(startDate) > new Date(vehicleData.end_date) ||
    new Date(endDate) < new Date(vehicleData.start_date)
  ) {
    const result = await updateVehicleStatus(
      vehicleId,
      startDate,
      endDate,
      firstName,
      lastName
    );

    return res.status(200).json({ success: true, id: result.id });
  }
  return next(new ErrorHander("Vehicle not available for booking", 404));
});
