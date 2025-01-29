import { ProfileModel } from '@user/domain/models/profile/profile.model';

export class ProfileArchivedEvent {
  constructor(public readonly profileModel: ProfileModel) {}
}
