import { ICommand } from '@nestjs/cqrs';

import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

export interface IAddressCommand {
  readonly street?: string;
  readonly extNumber?: string;
  readonly intNumber?: string;
  readonly neighborhood?: string;
  readonly zipCode?: string;
  readonly city?: string;
  readonly state?: string;
  readonly country?: string;
}

export interface IProfileCommand {
  readonly names?: string[];
  readonly lastName?: string;
  readonly secondLastName?: string;
  readonly phoneNumber?: string;
  readonly gender?: ProfileGenderEnum;
  readonly address?: IAddressCommand;
}

export interface IAccountCommand {
  readonly uuid: string;
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
}

export class UpdateUserCommand implements ICommand {
  public readonly uuid: string;
  public readonly profile?: IProfileCommand;
  public readonly accounts?: IAccountCommand[];

  constructor(root: UpdateUserCommand) {
    this.uuid = root.uuid;

    if (root.profile) {
      this.profile = root.profile;
    }

    if (root.accounts) {
      this.accounts = root.accounts;
    }
  }
}
