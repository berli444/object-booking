import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsPositive } from "class-validator";

export class CreateBookingObjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  availableQuantity: number;
}

export class UpdateBookingObjectDTO {
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  availableQuantity?: number;
}

export class DeleteBookingObjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

export class FindOneBookingObjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
