import dotenv from "dotenv";
import { VehicleType, Subtype, Vehicle, User } from "../models/vehicle.js";
dotenv.config();

export default async function seedDatabase() {
  try {
    console.log("Seeding Database...");

    await VehicleType.bulkCreate([
      { name: "2-wheeler" },
      { name: "4-wheeler" },
    ]);

    await Subtype.bulkCreate([
      { name: "Sports", VehicleTypeId: 1 },
      { name: "Cruiser", VehicleTypeId: 1 },
      { name: "SUV", VehicleTypeId: 2 },
      { name: "Sedan", VehicleTypeId: 2 },
    ]);

    await Vehicle.bulkCreate([
      { name: "Sports Car", SubtypeId: 1 },
      { name: "Mountain Bike", SubtypeId: 1 },
    ]);

    await User.bulkCreate([
      { first_name: "Vikash", last_name: "patel" },
      { first_name: "Zakash", last_name: "patel" },
    ]);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}
// 2022-11-06 16:58:10.583+05:30
