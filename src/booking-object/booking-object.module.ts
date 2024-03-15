import { Module } from "@nestjs/common";
import { BookingObjectService } from "./booking-object.service";
import { BookingObjectController } from "./booking-object.controller";
import { bookingProviders } from "./booking-object.provider";

@Module({
  providers: [BookingObjectService, ...bookingProviders],
  controllers: [BookingObjectController],
})
export class BookingObjectModule {}
