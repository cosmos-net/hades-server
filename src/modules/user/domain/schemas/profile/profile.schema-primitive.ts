import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export interface IProfileSchemaPrimitive {
  id?: number;
  uuid: string;
  names: string[];
  lastName: string;
  secondLastName: string;
  phoneNumber: string;
  gender: ProfileGenderEnum;
  address: {
    street: string;
    extNumber: string;
    intNumber: string | null;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export interface IListProfileSchemaPrimitive {
  total: number;
  items: IProfileSchemaPrimitive[];
}
