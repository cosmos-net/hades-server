export class DestroyRoleOutputDto {
  private readonly message: string;

  constructor(flag: boolean, details?: any) {
    this.message = flag ? 'Role deleted successfully' : `Role could not be deleted. ${details}`;
  }
}
