import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

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
  name?: string | null;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  price?: number | null;

  @ApiProperty()
  availableQuantity?: number | null;
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
