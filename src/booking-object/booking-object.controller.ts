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
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateBookingObjectDTO, UpdateBookingObjectDTO } from "./booking-object.dto";

@Controller("booking-object-object")
@ApiTags("Booking Object")
export class BookingObjectController {
  constructor(private readonly bookingService: BookingObjectService) {}

  @ApiOkResponse()
  @Post()
  async createBookingObject(
    @Body() createBookingObjectDTO: CreateBookingObjectDTO,
  ) {
    return this.bookingService.createBookingObject(createBookingObjectDTO);
  }

  @ApiOkResponse()
  @Get(":id")
  async getBookingObjectById(@Param("id") id: number) {
    return this.bookingService.getBookingObjectById({ id });
  }

  @ApiOkResponse()
  @Get()
  async getAllBookingObjects() {
    return this.bookingService.getAllBookingObjects();
  }

  @ApiOkResponse()
  @Delete(":id")
  async deleteBookingObjectById(@Param("id") id: number) {
    return this.bookingService.deleteBookingObjectById({ id });
  }

  @ApiOkResponse()
  @Patch(":id")
  async updateBookingObjectById(
    @Param("id") id: number,
    @Body() updateBookingObjectDTO: UpdateBookingObjectDTO,
  ) {
    return this.bookingService.updateBookingObjectById({
      id,
      ...updateBookingObjectDTO,
    });
  }
}
