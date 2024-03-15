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
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateBookingDTO, UpdateBookingDTO } from "./booking.dto";

@Controller("booking")
@ApiTags("Booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 400, description: "Incorrect input data." })
  @Post()
  async createBookingObject(@Body() createBookingDTO: CreateBookingDTO) {
    return this.bookingService.createBooking(createBookingDTO);
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  @Get(":id")
  async getBookingById(@Param("id") id: number) {
    return this.bookingService.getBookingById({ id });
  }

  @ApiResponse({ status: 200, description: "Success." })
  @Get()
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  @Delete(":id")
  async deleteBookingById(@Param("id") id: number) {
    return this.bookingService.deleteBookingById({ id });
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 400, description: "Incorrect input data." })
  @ApiResponse({ status: 404, description: "Booking not found." })
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
