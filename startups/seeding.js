import { VehicleType, Subtype, Vehicle, User } from "../models/vehicle.js";

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
      { name: "hatchback", VehicleTypeId: 2 },
    ]);

    await Vehicle.bulkCreate([
      { name: "KTM 300", SubtypeId: 1 },

      { name: "Royal Enfield", SubtypeId: 2 },

      { name: "Range Rover", SubtypeId: 3 },
      { name: "Mahinra Thar", SubtypeId: 3 },

      { name: "Honda City", SubtypeId: 4 },
      { name: "Maruti Suzuki", SubtypeId: 4 },

      { name: "Maruti Suzuki Alto 800", SubtypeId: 5 },
      
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
