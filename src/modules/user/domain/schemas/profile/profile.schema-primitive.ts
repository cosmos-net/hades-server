import { DeepPartial } from '@helpers/types/partials.helper';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export interface IProfileAddressSchema {
  street: string;
  extNumber: string;
  intNumber?: string | null;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export interface IProfileBaseSchema {
  uuid: string;
  names: string[];
  lastName: string;
  secondLastName?: string;
  phoneNumber: string;
  gender: ProfileGenderEnum;
  address: IProfileAddressSchema;
}

export interface IProfileSchemaPrimitive extends IProfileBaseSchema {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
}

export interface IListProfileSchemaPrimitive {
  total: number;
  items: IProfileSchemaPrimitive[];
}

export type DeepPartialProfileBaseSchema = DeepPartial<IProfileBaseSchema>;
