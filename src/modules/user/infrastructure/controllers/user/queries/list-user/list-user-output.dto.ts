import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export interface IAccount {
  id: number;
  uuid: string;
  username: string;
  email: string;
}

export interface IAddress {
  street: string;
  extNumber: string;
  intNumber?: string | null;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export interface IProfile {
  names: string[];
  lastName: string;
  secondLastName: string;
  phoneNumber: string;
  gender: ProfileGenderEnum;
  address: IAddress;
}

export interface IUser {
  id: number;
  uuid: string;
  status: string;
}

export interface IListUserOutputDto {
  user: IUser;
  profile: IProfile;
  accounts: IAccount[];
}

export class ListUserOutputDto extends PaginationOutputDto<IListUserOutputDto> {
  constructor(items: IListUserOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
