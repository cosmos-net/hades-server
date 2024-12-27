export class DestroySessionOutputDto {
  private readonly message: string;

  constructor(flag: boolean, details?: unknown) {
    this.message = flag ? 'Session deleted successfully' : `Session could not be deleted. ${JSON.stringify(details)}`;
  }
}
