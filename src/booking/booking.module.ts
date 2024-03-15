import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { bookingProviders } from "./booking.provider";

@Module({
  providers: [BookingService, ...bookingProviders],
  controllers: [BookingController],
})
export class BookingModule {}
