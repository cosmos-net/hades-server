import { Logger } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

import { MediatorService } from '@common/domain/events/mediator-service';
import { UserArchivedEvent } from '@user/domain/events/events-success-domain/user-archived.event';

export class UserArchivedEventHandler implements IEventHandler<UserArchivedEvent> {
  constructor(private readonly mediatorService: MediatorService) {}

  private readonly logger = new Logger(UserArchivedEventHandler.name);

  async handle(event: UserArchivedEvent): Promise<void> {
    const { userModel } = event;

    // Logic that runs when the event is triggered
    this.logger.log(`User with uuid: ${userModel.uuid} has been archived`);

    await this.mediatorService.emit('user.archived', userModel);
  }
}
