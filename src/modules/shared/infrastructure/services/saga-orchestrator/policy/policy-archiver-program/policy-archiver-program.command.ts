import { ICommand } from '@nestjs/cqrs';

export class PolicyArchiverProgramCommand implements ICommand {
  constructor(public readonly policyUUID: string) {}
}
