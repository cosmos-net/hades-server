import { ICommand } from '@nestjs/cqrs';

export class PolicyUnarchiverProgramCommand implements ICommand {
  constructor(public readonly policyUUID: string) {}
}
