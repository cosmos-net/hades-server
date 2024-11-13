import { OrderBy } from '@common/domain/criteria/orders/order-by';
import { OrderType } from '@common/domain/criteria/orders/order-type';
import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';

export class Order {
  readonly orderBy: OrderBy;
  readonly orderType: OrderType;

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }

  public static create(orderBy?: string, orderType?: OrderTypeEnum): Order {
    if (!orderBy && !orderType) {
      return Order.none();
    }

    if (!orderBy && orderType === OrderTypeEnum.ASC) {
      return Order.asc();
    }

    if (!orderBy && orderType === OrderTypeEnum.DESC) {
      return Order.desc();
    }

    if (orderBy && orderType === OrderTypeEnum.ASC) {
      return Order.asc(orderBy);
    }

    if (orderBy && orderType === OrderTypeEnum.DESC) {
      return Order.desc(orderBy);
    }

    return Order.none();
  }

  static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypeEnum.NONE));
  }

  static asc(orderBy?: string): Order {
    return new Order(new OrderBy(orderBy ?? ''), new OrderType(OrderTypeEnum.ASC));
  }

  static desc(orderBy?: string): Order {
    return new Order(new OrderBy(orderBy ?? ''), new OrderType(OrderTypeEnum.DESC));
  }

  public hasOrder(): boolean {
    return !this.orderType.isNone();
  }

  public getOrderBy(): string {
    return this.orderBy._value;
  }

  public getOrderType(): OrderTypeEnum {
    return this.orderType.value;
  }
}
