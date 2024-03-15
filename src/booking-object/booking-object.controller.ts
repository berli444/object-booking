import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { BookingObjectService } from "./booking-object.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateBookingObjectDTO,
  UpdateBookingObjectDTO,
} from "./booking-object.dto";

@Controller("booking-object-object")
@ApiTags("Booking Object")
export class BookingObjectController {
  constructor(private readonly bookingObjectService: BookingObjectService) {}

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 400, description: "Incorrect input data." })
  @Post()
  async createBookingObject(
    @Body() createBookingObjectDTO: CreateBookingObjectDTO,
  ) {
    return this.bookingObjectService.createBookingObject(
      createBookingObjectDTO,
    );
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  @Get(":id")
  async getBookingObjectById(@Param("id") id: number) {
    return this.bookingObjectService.getBookingObjectById({ id });
  }

  @ApiResponse({ status: 200, description: "Success." })
  @Get()
  async getAllBookingObjects() {
    return this.bookingObjectService.getAllBookingObjects();
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  @Delete(":id")
  async deleteBookingObjectById(@Param("id") id: number) {
    return this.bookingObjectService.deleteBookingObjectById({ id });
  }

  @ApiResponse({ status: 200, description: "Success." })
  @ApiResponse({ status: 400, description: "Incorrect input data." })
  @ApiResponse({ status: 404, description: "Booking not found." })
  @Patch(":id")
  async updateBookingObjectById(
    @Param("id") id: number,
    @Body() updateBookingObjectDTO: UpdateBookingObjectDTO,
  ) {
    return this.bookingObjectService.updateBookingObjectById({
      id,
      ...updateBookingObjectDTO,
    });
  }
}
