import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleCreatedEvent } from '@role/domain/events/events-success-domain/role-created.event';

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedEventHandler implements IEventHandler<RoleCreatedEvent> {
  private readonly logger = new Logger(RoleCreatedEventHandler.name);

  handle(event: RoleCreatedEvent): void {
    // Logic that runs when the event is triggered
    this.logger.log(`Role with uuid: ${event.uuid} has been created with name: ${event.name}`);
  }
}
