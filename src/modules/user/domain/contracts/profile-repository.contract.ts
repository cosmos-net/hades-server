export abstract class IProfileRepositoryContract {
  abstract isPhoneAvailable(phoneNumber: string): Promise<boolean>;
}
