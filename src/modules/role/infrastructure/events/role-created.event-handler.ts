import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RoleReDescribeEvent } from '@role/domain/events/events-success-domain/role-re-describe.event';

@EventsHandler(RoleReDescribeEvent)
export class RoleReDescribeEventHandler implements IEventHandler<RoleReDescribeEvent> {
  handle(event: RoleReDescribeEvent): void {
    // Lógica que se ejecuta cuando se dispara el evento
    console.log(`Role created: ${event.roleUUID}`);
  }
}
