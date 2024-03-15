import { Inject, Injectable } from "@nestjs/common";
import { BookingObject } from "./booking-object.entity";
import {
  CreateBookingObjectDTO,
  DeleteBookingObjectDTO,
  FindOneBookingObjectDTO,
  UpdateBookingObjectDTO,
} from "./booking-object.dto";

@Injectable()
export class BookingObjectService {
  constructor(
    @Inject("BOOKING_OBJECT_REPOSITORY")
    private bookingObjectRepository: typeof BookingObject,
  ) {}

  async createBookingObject({
    name,
    description,
    availableQuantity,
    price,
  }: CreateBookingObjectDTO) {
    const bookingObject = await this.bookingObjectRepository.create({
      name,
      description,
      availableQuantity,
      price,
    });

    return bookingObject;
  }

  async getAllBookingObjects() {
    const bookingObjects = await this.bookingObjectRepository.findAll();

    return bookingObjects;
  }

  async getBookingObjectById({ id }: FindOneBookingObjectDTO) {
    const bookingObject = await this.bookingObjectRepository.findByPk(id);

    return bookingObject;
  }

  async deleteBookingObjectById({ id }: DeleteBookingObjectDTO) {
    const isDeleted = await this.bookingObjectRepository.destroy({
      where: { id },
    });

    return !!isDeleted;
  }

  async updateBookingObjectById({
    id,
    availableQuantity,
    price,
    description,
    name,
  }: UpdateBookingObjectDTO) {
    const isUpdated = await this.bookingObjectRepository.update(
      { availableQuantity, price, description, name },
      { where: { id } },
    );

    return !!isUpdated;
  }
}
