import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { BookingObject } from "./booking-object.entity";

@Table
export class Booking extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end: Date;

  @ForeignKey(() => BookingObject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingObjectId: number;

  @BelongsTo(() => BookingObject)
  bookingObject: BookingObject;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
