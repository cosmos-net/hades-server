import { ICommand } from '@nestjs/cqrs';

export class PolicyUpdaterProgramCommand implements ICommand {
  constructor(
    public readonly policyUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description?: string,
  ) {}
}
