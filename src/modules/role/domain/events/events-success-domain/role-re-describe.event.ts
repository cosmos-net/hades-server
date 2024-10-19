export class RoleReDescribeEvent {
  constructor(
    public readonly roleUUID: string,
    public readonly description: string,
  ) {}
}
