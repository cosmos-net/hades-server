import { Filters } from '@common/domain/criteria/filters/filters';
import { Order } from '@common/domain/criteria/orders/order';
import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { Primitives } from '@common/domain/value-object/types/value-object';
import { ListOrderByTypes } from '@role/infrastructure/controllers/queries/list-role/list-role-input.dto';

export class Criteria {
  public readonly filters: Filters;
  public readonly order: Order;
  public readonly limit: number;
  public readonly offset: number;

  constructor(
    filters: Array<Map<string, Primitives>>,
    orderBy: ListOrderByTypes,
    orderType: OrderTypeEnum,
    limit: number,
    offset: number,
  ) {
    this.filters = Filters.create(filters);
    this.order = Order.create(orderBy, orderType);
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilters(): boolean {
    return this.filters.hasFilters();
  }

  public hasOrder(): boolean {
    return this.order.hasOrder();
  }
}
