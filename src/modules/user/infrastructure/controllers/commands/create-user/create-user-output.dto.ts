import { UserAggregate } from '@user/domain/aggregates/user.aggregate';
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
  uuid: string;
  username: string;
  email: string;
}

interface ICreateUserOutputDto {
  id: number;
  uuid: string;
  status: string;
  accounts: IAccount[];
  profile: IProfile;
};

export class CreateUserOutputDto {
  public readonly user: ICreateUserOutputDto;

  constructor(root: UserAggregate) {
    this.user = {
      id: root.userModel.id,
      uuid: root.userModel.uuid,
      status: root.userModel.status,
      accounts: root.accountsModel.map((account) => ({
        id: account.id,
        uuid: account.uuid,
        username: account.username,
        email: account.email,
      })),
      profile: {
        id: root.profileModel.id,
        uuid: root.profileModel.uuid,
        names: root.profileModel.names.join(' '),
        lastName: root.profileModel.lastName,
        secondLastName: root.profileModel.secondLastName,
        phoneNumber: root.profileModel.phoneNumber,
        gender: root.profileModel.gender,
        address: root.profileModel.address,
      },
    };
  }
}
