import sequelize from "../config/db.js";
import { DataTypes } from 'sequelize';
import seedDatabase from "../startups/seeding.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const VehicleType = sequelize.define("VehicleType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Subtype = sequelize.define("Subtype", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  VehicleTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: "id",
    },
  },
});

export const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SubtypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Subtype,
      key: "id",
    },
  },
  booked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});


VehicleType.hasMany(Subtype);
Subtype.hasMany(Vehicle);
Subtype.belongsTo(VehicleType);
Vehicle.belongsTo(Subtype);
Vehicle.belongsTo(User);


// (async () => {
//   await sequelize.sync({ force: true });
//   await seedDatabase()
// })();
