export interface IProfileRepositoryContract {
  isPhoneAvailable(phoneNumber: string): Promise<boolean>;
}
