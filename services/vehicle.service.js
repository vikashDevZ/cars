import { VehicleType, Subtype, Vehicle, User } from "../models/vehicle.js";
import ErrorHander from "../utils/errorhandler.js";

export async function getVehicleInfo(VehicleId) {
  const vehicleInfo = await Vehicle.findAll({
    where: {
      id: VehicleId,
    },
    // attributes: ['id', 'name', 'booked'],
    include: [
      {
        model: Subtype,
        include: VehicleType,
      },
      User,
    ],
  });

  if (vehicleInfo) return vehicleInfo[0];
  throw new ErrorHander("vehicleInfo not found with this Id", 404);
}

export async function getAllVehicleInfo(SubtypeId) {
  const vehiclesList = await Vehicle.findAll({
    where: { SubtypeId: SubtypeId },
  });

  console.log("vehiclesList", vehiclesList);

  if (vehiclesList) return vehiclesList;
  throw new ErrorHander("vehicles not found", 404);
}

export async function getSubModelType(SubTypeId) {
  const subtypeInfo = await Subtype.findByPk(SubTypeId, {});

  console.log("subtypeInfo", subtypeInfo);

  if (subtypeInfo) return subtypeInfo;
  throw new ErrorHander("subtypeInfo not found with this Id", 404);
}

export async function getAllSubModelType(VehicleTypeId) {
  const subtypeList = await Subtype.findAll({
    where: { VehicleTypeId: VehicleTypeId },
  });

  console.log("subtypeList", subtypeList);

  if (subtypeList) return subtypeList;
  throw new ErrorHander("subtypeList not found", 404);
}

export async function getVehicleType(VehicleTypeId) {
  const vehicleTypeInfo = await VehicleType.findByPk(VehicleTypeId, {});

  console.log("vehicleTypeInfo", vehicleTypeInfo);

  if (vehicleTypeInfo) return vehicleTypeInfo;
  throw new ErrorHander("vehicleTypeInfo not found with this Id", 404);
}

export async function getAllVehicleType() {
  const vehicleTypeList = await VehicleType.findAll();

  console.log("vehicleTypeList", vehicleTypeList);

  if (vehicleTypeList) return vehicleTypeList;
  throw new ErrorHander("vehicleTypeList not found", 404);
}

export async function updateVehicleStatus(
  VehicleId,
  startDate,
  endDate,
  userId
) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ErrorHander("User not found", 404);
  }
  const vehicle = await Vehicle.findByPk(VehicleId);
  if (!vehicle) {
    throw new ErrorHander("Vehicle not found", 404);
  }

  vehicle.booked = true;
  vehicle.start_date = startDate;
  vehicle.end_date = endDate;
  vehicle.userId = userId;
  console.log("vehicle", vehicle);
  return await vehicle.save();
}
