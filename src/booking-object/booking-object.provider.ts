import { BookingObject } from "./booking-object.entity";

export const bookingProviders = [
  {
    provide: "BOOKING_OBJECT_REPOSITORY",
    useValue: BookingObject,
  },
];
