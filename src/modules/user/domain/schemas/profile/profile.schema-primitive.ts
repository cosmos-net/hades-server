import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export interface IProfileSchemaPrimitive {
  id: number;
  uuid: string;
  names: string[];
  lastName: string;
  secondLastName: string;
  phoneNumber: string;
  gender: ProfileGenderEnum;
  address: {
    street: string;
    extNumber: string;
    intNumber: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface IListProfileSchemaPrimitive {
  total: number;
  items: IProfileSchemaPrimitive[];
}
