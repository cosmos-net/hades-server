export class SearchAccountByUsernameQuery {
  constructor(
    public readonly username: string,
    public readonly withArchived?: boolean,
    public readonly failIfArchived?: boolean,
    public readonly includeSessions?: boolean,
  ) {}
}
