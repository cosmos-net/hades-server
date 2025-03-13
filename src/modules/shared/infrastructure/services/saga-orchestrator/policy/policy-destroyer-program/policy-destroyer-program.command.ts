import { ICommand } from '@nestjs/cqrs';

export class PolicyDestoyerProgramCommand implements ICommand {
  constructor(public readonly policyUUID: string) {}
}
