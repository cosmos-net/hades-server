import { ProfileModel } from '@user/domain/models/profile/profile.model';

export abstract class IProfileRepositoryContract {
  abstract getOneBy(phoneNumberOrUUID: string): Promise<ProfileModel>;
}
