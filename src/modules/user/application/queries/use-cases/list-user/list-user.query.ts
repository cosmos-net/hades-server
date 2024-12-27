import { IQuery } from '@nestjs/cqrs';

import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export const USER_OPTIONS_ORDER_BY_VALUE = [
  'status',
  'username',
  'email',
  'name',
  'lastName',
  'secondLastName',
  'phoneNumber',
  'gender',
  'street',
  'extNumber',
  'intNumber',
  'neighborhood',
  'zipCode',
  'city',
  'state',
  'country',
  'createdAt',
  'updatedAt',
  'archivedAt',
] as const;

export type USER_OPTIONS_ORDER_BY_VALUE_TYPE = typeof USER_OPTIONS_ORDER_BY_VALUE[number];

export class ListUserQuery implements IQuery {
  public readonly orderType: OrderTypeEnum;

  public readonly orderBy: USER_OPTIONS_ORDER_BY_VALUE_TYPE;

  public readonly limit: number;

  public readonly offset: number;

  public readonly filtersMap: Array<Map<string, PrimitivesType>>;

  constructor(props: ListUserQuery) {
    this.orderType = props.orderType;
    this.orderBy = props.orderBy;
    this.limit = props.limit;
    this.offset = props.offset;
    this.filtersMap = props.filtersMap;
  }
}
