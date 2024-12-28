import { AccountModel } from "@user/domain/models/account/account.model";
import { ProfileModel } from "@user/domain/models/profile/profile.model";
import { UserModel } from "@user/domain/models/user/user.model";

export class UserCreatedEvent {
  constructor(
    public readonly userModel: UserModel,
    public readonly AccountsModel: AccountModel[],
    public readonly profileModel: ProfileModel
  ) {}
}
