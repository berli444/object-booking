import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateBookingDTO, UpdateBookingDTO } from "./booking.dto";

@Controller("booking")
@ApiTags("Booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOkResponse()
  @Post()
  async createBookingObject(@Body() createBookingDTO: CreateBookingDTO) {
    return this.bookingService.createBooking(createBookingDTO);
  }

  @ApiOkResponse()
  @Get(":id")
  async getBookingById(@Param("id") id: number) {
    return this.bookingService.getBookingById({ id });
  }

  @ApiOkResponse()
  @Get()
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @ApiOkResponse()
  @Delete(":id")
  async deleteBookingById(@Param("id") id: number) {
    return this.bookingService.deleteBookingById({ id });
  }

  @ApiOkResponse()
  @Patch(":id")
  async updateBookingObjectById(
    @Param("id") id: number,
    @Body() updateBookingDTO: UpdateBookingDTO,
  ) {
    return this.bookingService.updateBookingById({
      id,
      ...updateBookingDTO,
    });
  }
}
