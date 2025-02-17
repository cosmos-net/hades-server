import { ICommand } from '@nestjs/cqrs';

export class PolicyCreatorProgramCommand implements ICommand {
  constructor(
    public readonly roleUUID: string,
    public readonly permissionUUIDs: string[],
    public readonly description?: string,
  ) {}
}
