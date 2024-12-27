import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';

export enum KeysFilterMapEnum {
  FIELD = 'field',
  VALUE = 'value',
  OPERATOR = 'operator',
}

export interface IKeysFilterMap {
  [KeysFilterMapEnum.FIELD]: string;
  [KeysFilterMapEnum.VALUE]: PrimitivesType;
  [KeysFilterMapEnum.OPERATOR]: OperatorsEnum;
}
