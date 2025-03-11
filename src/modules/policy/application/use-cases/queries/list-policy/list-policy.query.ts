import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';

export const POLICY_ORDER_BY_VALUES = [
  'id',
  'uuid',
  'title',
  'description',
  'createdAt',
  'updatedAt',
  'archivedAt',
] as const;

export type ListPolicyOrderByTypes = (typeof POLICY_ORDER_BY_VALUES)[number];

export interface IParamsListPolicyQuery {
  id?: number;
  uuid?: string;
  uuids?: string[];
  title?: string;
  description?: string;
  withArchived?: boolean;
  createdAtFrom?: string;
  createdAtTo?: string;
  updatedAtFrom?: string;
  updatedAtTo?: string;
  archivedAtFrom?: string;
  archivedAtTo?: string;
}

export class ListPolicyQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: ListPolicyOrderByTypes;

  public readonly limit: number;

  public readonly offset: number;

  public readonly withArchived: boolean;

  public readonly params: IParamsListPolicyQuery;

  constructor(props: ListPolicyQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.withArchived = props.withArchived;
    this.params = props.params;
  }
}
