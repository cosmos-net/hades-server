import { UserModel } from '@user/domain/models/user/user.model';

export class UserArchivedEvent {
  constructor(public readonly userModel: UserModel) {}
}
