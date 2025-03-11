import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';

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

export interface IListPermissionParams {
  id?: number;
  uuid?: string;
  uuids?: string[];
  title?: string;
  description?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  updatedAtFrom?: string;
  updatedAtTo?: string;
  archivedAtFrom?: string;
  archivedAtTo?: string;
}

export class ListPermissionQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: ListPermissionOrderByTypes;

  public readonly limit: number;

  public readonly offset: number;

  public readonly withArchived: boolean;

  public readonly params: IListPermissionParams;

  constructor(props: ListPermissionQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.withArchived = props.withArchived;
    this.params = props.params;
  }
}
