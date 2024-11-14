import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { Primitives } from '@common/domain/value-object/types/value-object';

export enum KeysFilterMapEnum {
  FIELD = 'field',
  VALUE = 'value',
  OPERATOR = 'operator',
}

export interface IKeysFilterMap {
  [KeysFilterMapEnum.FIELD]: string;
  [KeysFilterMapEnum.VALUE]: Primitives;
  [KeysFilterMapEnum.OPERATOR]: OperatorsEnum;
}
