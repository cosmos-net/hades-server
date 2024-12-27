import { Filters } from '@common/domain/criteria/filters/filters';
import { Order } from '@common/domain/criteria/orders/order';
import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export class Criteria {
  public readonly filters: Filters;
  public readonly order: Order;
  public readonly limit: number;
  public readonly offset: number;
  public readonly withArchived: boolean;

  constructor(
    filters: Array<Map<string, PrimitivesType>>,
    orderBy: string,
    orderType: OrderTypeEnum,
    limit: number,
    offset: number,
    withArchived?: boolean | undefined,
  ) {
    this.filters = Filters.create(filters);
    this.order = Order.create(orderBy, orderType);
    this.limit = limit;
    this.offset = offset;
    this.withArchived = withArchived;
  }

  public hasFilters(): boolean {
    return this.filters.hasFilters();
  }

  public hasOrder(): boolean {
    return this.order.hasOrder();
  }

  public hasWithArchived(): boolean {
    return this.withArchived;
  }
}
