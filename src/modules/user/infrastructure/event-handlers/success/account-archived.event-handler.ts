import { Logger } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

import { AccountArchivedEvent } from '@user/domain/events/events-success-domain/account-archived.event';

export class AccountArchivedEventHandler implements IEventHandler<AccountArchivedEvent> {
  private readonly logger = new Logger(AccountArchivedEventHandler.name);

  async handle(event: AccountArchivedEvent): Promise<void> {
    const { accountsModel } = event;

    // Logic that runs when the event is triggered
    this.logger.log(`Account with uuid: ${accountsModel.uuid} has been archived`);
  }
}
