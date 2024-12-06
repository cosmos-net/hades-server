import { AggregateRoot } from '@nestjs/cqrs';

import { UserCreatedEvent } from '@user/domain/events/events-success-domain/user-created.event';
import { AccountModel } from '@user/domain/models/account/account.model';
import { ProfileModel } from '@user/domain/models/profile/profile.model';
import { UserModel } from '@user/domain/models/user/user.model';

export class UserAggregate extends AggregateRoot {
  private readonly _userModel: UserModel;
  private readonly _accountModel: AccountModel;
  private readonly _profileModel: ProfileModel;

  constructor(userModel: UserModel, accountModel: AccountModel, profileModel: ProfileModel) {
    super();
    this.hydrate(userModel, accountModel, profileModel);
  }

  get userModel(): UserModel {
    return this._userModel;
  }

  get accountModel(): AccountModel {
    return this._accountModel;
  }

  get profileModel(): ProfileModel {
    return this._profileModel;
  }

  public hydrate(user: UserModel, account: AccountModel, profile: ProfileModel) {
    this._userModel.hydrate(user.toPrimitives());
    this._accountModel.hydrate(account.toPrimitives());
    this._profileModel.hydrate(profile.toPrimitives());
  }

  public toPrimitives() {
    return {
      user: this._userModel.toPrimitives(),
      account: this._accountModel.toPrimitives(),
      profile: this._profileModel.toPrimitives(),
    };
  }

  // TODO: map more fields to emit the event
  public create() {
    this.apply(new UserCreatedEvent(this.userModel.uuid, this.userModel.status));
  }

  public archive() {
    this._userModel.archive();
    this._profileModel.archive();
    this._accountModel.archive();
  }
}
