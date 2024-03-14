import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../config";
import { Booking } from "../booking/entities/booking.entity";
import { BookingObject } from "../booking/entities/booking-object.entity";

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
