import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export const PERMISSION_ORDER_BY_VALUES = [
  'id',
  'uuid',
  'title',
  'description',
  'createdAt',
  'updatedAt',
  'archivedAt',
] as const;

export type ListPermissionOrderByTypes = (typeof PERMISSION_ORDER_BY_VALUES)[number];

export class ListPermissionQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: ListPermissionOrderByTypes;

  public readonly limit: number;

  public readonly offset: number;

  public readonly withArchived: boolean;

  public readonly filtersMap: Array<Map<string, PrimitivesType>>;

  constructor(props: ListPermissionQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.withArchived = props.withArchived;
    this.filtersMap = props.filtersMap;
  }
}
