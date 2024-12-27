export class DestroyRoleOutputDto {
  private readonly message: string;

  constructor(flag: boolean, details?: unknown) {
    this.message = flag ? 'Role deleted successfully' : `Role could not be deleted. ${JSON.stringify(details)}`;
  }
}
