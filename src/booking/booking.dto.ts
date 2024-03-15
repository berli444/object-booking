import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from "class-validator";

export class CreateBookingDTO {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  start?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  bookingObjectId: number;
}

export class UpdateBookingDTO {
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  start?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  end?: Date | null;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  quantity?: number | null;
}

export class DeleteBookingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

export class FindOneBookingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
