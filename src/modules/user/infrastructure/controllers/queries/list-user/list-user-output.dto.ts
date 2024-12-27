import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';
import { ListUserAggregate } from '@user/domain/aggregates/list-user.aggregate';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

interface IAddress {
  street: string;
  extNumber: string;
  intNumber?: string | null;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

interface IProfile {
  id: number;
  uuid: string;
  names: string;
  lastName: string;
  secondLastName: string;
  phoneNumber: string,
  gender: ProfileGenderEnum;
  address: IAddress;
}

interface IAccount {
  id: number;
  uuid: string
  username: string;
  email: string;
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
  constructor(items: ListUserAggregate, page: number, limit: number) {
    const itemsPrimitives = items.toPrimitives();
    const total = items.getTotal;
    const itemsMapped = itemsPrimitives.map(({ user, profile, accounts }): IListUserOutputDto => ({
      user: {
        id: user.id,
        uuid: user.uuid,
        status: user.status,
      },
      profile: {
        id: profile.id,
        uuid: profile.uuid,
        names: profile.names.join(' '),
        lastName: profile.lastName,
        secondLastName: profile.secondLastName,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        address: profile.address,
      },
      accounts: accounts.map(
        (account): IAccount => ({
          id: account.id,
          uuid: account.uuid,
          username: account.username,
          email: account.email,
        }),
      ),
    }));

    super(itemsMapped, page, limit, total);
  }
}
