export class SearchAccountByEmailQuery {
  constructor(
    public readonly email: string,
    public readonly withArchived?: boolean,
    public readonly failIfArchived?: boolean,
    public readonly includeSessions?: boolean,
  ) {}
}
