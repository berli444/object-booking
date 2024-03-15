import { Booking } from "./booking.entity";
import { BookingObject } from "../booking-object/booking-object.entity";

export const bookingProviders = [
  {
    provide: "BOOKING_REPOSITORY",
    useValue: Booking,
  },
  {
    provide: "BOOKING_OBJECT_REPOSITORY",
    useValue: BookingObject,
  },
];
