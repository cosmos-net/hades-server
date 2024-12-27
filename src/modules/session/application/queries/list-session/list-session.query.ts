import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { ListOrderByTypes } from '@session/infrastructure/controllers/queries/list-session/list-session-input.dto';

export class ListSessionQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: ListOrderByTypes;

  public readonly limit: number;

  public readonly offset: number;

  public readonly withArchived: boolean;

  public readonly filtersMap: Array<Map<string, PrimitivesType>>;

  constructor(props: ListSessionQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.withArchived = props.withArchived;
    this.filtersMap = props.filtersMap;
  }
}
