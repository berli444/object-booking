import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../config";
import { Booking } from "../booking/booking.entity";
import { BookingObject } from "../booking-object/booking-object.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([Booking, BookingObject]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
