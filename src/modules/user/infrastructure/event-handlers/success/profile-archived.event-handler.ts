import { Logger } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

import { ProfileArchivedEvent } from '@user/domain/events/events-success-domain/profile-archived.event';

export class ProfileArchivedEventHandler implements IEventHandler<ProfileArchivedEvent> {
  private readonly logger = new Logger(ProfileArchivedEventHandler.name);

  async handle(event: ProfileArchivedEvent): Promise<void> {
    const { profileModel } = event;

    // Logic that runs when the event is triggered
    this.logger.log(`Profile with uuid: ${profileModel.uuid} has been archived`);
  }
}
