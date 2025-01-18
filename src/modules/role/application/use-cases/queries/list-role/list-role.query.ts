import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { ListOrderByTypes } from '@role/infrastructure/controllers/queries/list-role/list-role-input.dto';

export class ListRoleQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: ListOrderByTypes;

  public readonly limit: number;

  public readonly offset: number;

  public readonly withArchived: boolean;

  public readonly filtersMap: Array<Map<string, PrimitivesType>>;

  constructor(props: ListRoleQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.withArchived = props.withArchived;
    this.filtersMap = props.filtersMap;
  }
}
