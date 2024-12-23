export abstract class IAccountRepositoryContract {
  abstract isUsernameAvailable(username: string): Promise<boolean>;
  abstract isEmailAvailable(email: string): Promise<boolean>;
}
