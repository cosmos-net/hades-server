import { Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';
import { RoleArchivedEvent } from '@role/domain/events/events-success-domain/role-archive.event';

@Injectable()
@EventsHandler(RoleArchivedEvent)
export class RoleArchivedEventHandler implements IEventHandler<RoleArchivedEvent> {
  constructor(private readonly mediatorStoreService: MediatorStoreService) {}

  private readonly logger = new Logger(RoleArchivedEventHandler.name);

  async handle(event: RoleArchivedEvent): Promise<void> {
    const { roleModel } = event;

    // Logic that runs when the event is triggered
    this.logger.log(`Role with uuid: ${roleModel.uuid} has been archived`);

    await this.mediatorStoreService.publish('role.archived', roleModel);
  }
}
