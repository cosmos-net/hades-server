import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { EnumValueObject } from '@common/domain/value-object/types/enum-value-object';

export class OrderType extends EnumValueObject<OrderTypeEnum> {
  constructor(value: OrderTypeEnum) {
    super(value, Object.values(OrderTypeEnum));
  }

  public static create(value: OrderTypeEnum): OrderType {
    switch (value) {
      case OrderTypeEnum.ASC:
        return new OrderType(OrderTypeEnum.ASC);
      case OrderTypeEnum.DESC:
        return new OrderType(OrderTypeEnum.DESC);
      default:
        // TODO: Handle this error with a domain exception
        throw new Error('Invalid OrderType');
    }
  }

  public isNone(): boolean {
    return this.value === OrderTypeEnum.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypeEnum.ASC;
  }

  public isDesc(): boolean {
    return this.value === OrderTypeEnum.DESC;
  }

  protected throwErrorForInvalidValue(value: OrderTypeEnum): void {
    // TODO: Handle this error with a domain exception
    throw new Error(`The value ${value} is not a valid OrderType`);
  }
}
