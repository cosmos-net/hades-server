import { Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { UserArchivedEvent } from '@user/domain/events/events-success-domain/user-archived.event';

@Injectable()
@EventsHandler(UserArchivedEvent)
export class UserArchivedEventHandler implements IEventHandler<UserArchivedEvent> {
  constructor(private readonly mediatorStoreService: MediatorStoreService) {}

  private readonly logger = new Logger(UserArchivedEventHandler.name);

  async handle(event: UserArchivedEvent): Promise<void> {
    const { userModel } = event;

    // Logic that runs when the event is triggered
    this.logger.log(`User with uuid: ${userModel.uuid} has been archived`);

    await this.mediatorStoreService.publish('user.archived', userModel);
  }
}
