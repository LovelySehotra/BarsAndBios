import { Type } from "class-transformer";

export class BaseDto {
  @Type(() => String)
  _id?: string;

  @Type(() => Date)
  createdAt?: Date;

  @Type(() => Date)
  updatedAt?: Date;
}
