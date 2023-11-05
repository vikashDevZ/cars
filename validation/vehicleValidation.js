import Joi from "joi";

export const bookVehicleSchema = Joi.object({
  vehicleId: Joi.number().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const VehicleQuerySchema = Joi.object({
  vehicleType: Joi.number().integer().min(1).max(10).optional(),
  vehicleSubType: Joi.number().integer().min(1).max(100).optional(),
});
