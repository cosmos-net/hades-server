import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleReNamedEvent } from '@role/domain/events/events-success-domain/role-renamed.event';

@EventsHandler(RoleReNamedEvent)
export class RoleReNamedEventHandler implements IEventHandler<RoleReNamedEvent> {
  private readonly logger = new Logger(RoleReNamedEventHandler.name);

  handle(event: RoleReNamedEvent): void {
    // Logic that runs when the event is triggered
    this.logger.log(
      `RoleReDescribeEvent: ${event.uuid} has been re-described from ${event.legacyName} to ${event.currentName}`,
    );
  }
}
