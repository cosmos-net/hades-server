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
  name: string;
  lastName: string;
  secondLastName: string;
  phoneNumber: string,
  gender: ProfileGenderEnum;
  address: IAddress;
}

interface IAccount {
  username: string;
  email: string;
}

interface ICreateUserOutputDto {
  id: string;
  uuid: string;
  status: string;
  accounts: IAccount[];
  profile: IProfile;
};

export class GetUserOutputDto {
  public readonly user: ICreateUserOutputDto;

  constructor(root: GetUserOutputDto) {
    this.user = root.user;
  }
}
