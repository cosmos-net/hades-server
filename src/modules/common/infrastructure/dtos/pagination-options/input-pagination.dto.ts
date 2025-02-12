import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';

export class InputPaginationDto {
  @Transform(({ value }): void => value.toUpperCase())
  @IsOptional()
  @IsEnum(OrderTypeEnum, {
    message: 'Order type options are not supported, only ASC or DESC',
  })
  public readonly orderType: OrderTypeEnum = OrderTypeEnum.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  public readonly limit: number = 10;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
