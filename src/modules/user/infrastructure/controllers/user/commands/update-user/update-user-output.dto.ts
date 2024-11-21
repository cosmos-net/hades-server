import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export class UpdateUserOutputDto {
  public readonly user: {
    id: string;
    uuid: string;
    status: string;
  };

  public readonly account: {
    username: string;
    email: string;
  };

  public readonly profile: {
    name: string;
    lastName: string;
    secondLastName: string;
    phoneNumber: string;
    gender: ProfileGenderEnum;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
}
