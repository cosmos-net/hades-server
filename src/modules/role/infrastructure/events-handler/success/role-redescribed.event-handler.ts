import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleReDescribedEvent } from '@role/domain/events/events-success-domain/role-redescribed.event';

@EventsHandler(RoleReDescribedEvent)
export class RoleReDescribedEventHandler implements IEventHandler<RoleReDescribedEvent> {
  private readonly logger = new Logger(RoleReDescribedEventHandler.name);

  handle(event: RoleReDescribedEvent): void {
    // Logic that runs when the event is triggered
    this.logger.log(
      `RoleReDescribeEvent: ${event.uuid} has been re-described from ${event.legacyDescription} to ${event.currentDescription}`,
    );
  }
}
