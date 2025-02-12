export class DestroyPermissionOutputDto {
  private readonly message: string;

  constructor(flag: boolean, details?: unknown) {
    this.message = flag
      ? 'Permission deleted successfully'
      : `Permission could not be deleted. ${JSON.stringify(details)}`;
  }
}
