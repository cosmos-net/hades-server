import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MediatorService } from '@common/domain/events/mediator-service';

@Injectable()
export class UserArchivedEventHandler {
  constructor(private readonly mediatorService: MediatorService) {}

  private readonly logger = new Logger(UserArchivedEventHandler.name);

  @OnEvent('user.archived')
  async handle(userModel): Promise<void> {
    // Logic that runs when the event is triggered
    this.logger.log(`User with uuid: ${userModel.uuid} has been archived`);

    // await this.mediatorService.emit('user.archived', userModel);
  }
}
