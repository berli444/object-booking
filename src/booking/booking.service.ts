import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Booking } from "./booking.entity";
import {
  CreateBookingDTO,
  DeleteBookingDTO,
  FindOneBookingDTO,
  UpdateBookingDTO,
} from "./booking.dto";
import { BookingObject } from "../booking-object/booking-object.entity";
import { Op } from "sequelize";

@Injectable()
export class BookingService {
  constructor(
    @Inject("BOOKING_REPOSITORY")
    private bookingRepository: typeof Booking,
    @Inject("BOOKING_OBJECT_REPOSITORY")
    private bookingObjectRepository: typeof BookingObject,
  ) {}

  async createBooking({
    start = new Date(),
    end,
    quantity,
    bookingObjectId,
  }: CreateBookingDTO) {
    const availableObjects = await this.getAvailableBookingObjectCount(
      bookingObjectId,
      start,
      end,
    );

    if (availableObjects - quantity >= 0) {
      const newBooking = await this.bookingRepository.create({
        start,
        end,
        quantity,
        bookingObjectId,
      });

      return newBooking;
    } else {
      throw new BadRequestException(
        "There is no available quantity objects to book.",
      );
    }
  }

  async getAllBookings() {
    const bookingObjects = await this.bookingRepository.findAll();

    return bookingObjects;
  }

  async getBookingById({ id }: FindOneBookingDTO) {
    const bookingObject = await this.bookingRepository.findByPk(id);

    if (!bookingObject) throw new NotFoundException();

    return bookingObject;
  }

  async deleteBookingById({ id }: DeleteBookingDTO) {
    const isDeleted = await this.bookingRepository.destroy({
      where: { id },
    });

    if (!isDeleted) throw new NotFoundException();

    return true;
  }

  async updateBookingById({ id, start, end, quantity }: UpdateBookingDTO) {
    const updatingBooking = await this.bookingRepository.findByPk(id);

    if (!updatingBooking) throw new NotFoundException();

    const availableObjects = await this.getAvailableBookingObjectCount(
      updatingBooking.bookingObjectId,
      start || updatingBooking.start,
      end || updatingBooking.end,
    );

    const summaryAvailableAfterCalculations =
      availableObjects -
      (quantity || updatingBooking.quantity) +
      updatingBooking.quantity;

    if (summaryAvailableAfterCalculations >= 0) {
      const newBooking = await this.bookingRepository.update(
        {
          start,
          end,
          quantity,
        },
        { where: { id } },
      );

      return !!newBooking;
    } else {
      throw new BadRequestException(
        "There is no available quantity objects to book.",
      );
    }
  }

  private async getAvailableBookingObjectCount(
    bookingObjectId: number,
    startTime: Date,
    endTime: Date,
  ) {
    const bookingObject = await this.bookingObjectRepository.findByPk(
      bookingObjectId,
    );

    if (!bookingObject) throw new NotFoundException();

    const bookings = await this.getAllBookingsByObject(
      startTime,
      endTime,
      bookingObjectId,
    );

    const bookedObjects = this.getCountOfBookedObjects(bookings);

    console.log(bookedObjects, "bookedObjects");

    return bookingObject.availableQuantity - bookedObjects;
  }

  private getAllBookingsByObject(
    startTime: Date,
    endTime: Date,
    bookingObjectId: number,
  ) {
    return this.bookingRepository.findAll({
      where: {
        bookingObjectId,
        [Op.and]: [
          {
            start: {
              [Op.lt]: endTime,
            },
          },
          {
            end: {
              [Op.gt]: startTime,
            },
          },
        ],
      },
    });
  }

  private getCountOfBookedObjects(bookings: Booking[]) {
    return bookings.reduce((sum, bookedObject) => {
      return sum + bookedObject.quantity;
    }, 0);
  }
}
