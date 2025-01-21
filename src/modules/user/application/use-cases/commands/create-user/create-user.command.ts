import { ICommand } from '@nestjs/cqrs';

import { ProfileGenderEnum } from '@user/domain/constants/general-rules';
import { StatusEnum } from '@user/domain/enums/user-status-enum';

export interface IAddressCommand {
  readonly street: string;
  readonly extNumber: string;
  readonly intNumber?: string;
  readonly neighborhood: string;
  readonly zipCode: string;
  readonly city: string;
  readonly state: string;
  readonly country: string;
}

export interface IProfileCommand {
  readonly uuid: string;
  readonly names: string[];
  readonly lastName: string;
  readonly secondLastName?: string;
  readonly phoneNumber: string;
  readonly gender: ProfileGenderEnum;
  readonly address: IAddressCommand;
}

export interface IAccountCommand {
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}

export interface IUserCommand {
  readonly uuid: string;
  readonly status: StatusEnum;
}

export class CreateUserCommand implements ICommand {
  public readonly user: IUserCommand;
  public readonly profile: IProfileCommand;
  public readonly accounts: IAccountCommand[];

  constructor({
    user,
    profile,
    accounts,
  }: {
    user?: Partial<IUserCommand>;
    profile: IProfileCommand;
    accounts: IAccountCommand[];
  }) {
    const status = user?.status ?? StatusEnum.PENDING;

    this.user = { uuid: profile.uuid, status };
    this.profile = profile;
    this.accounts = accounts;
  }
}
