import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IMediatorStore } from '@common/domain/events/mediator-store';

@Injectable()
export class MediatorService implements IMediatorStore {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit(event: string, data: unknown): Promise<void> {
    await this.eventEmitter.emitAsync(event, data);
  }

  async listening(event: string, listener: (data: unknown) => void): Promise<void> {
    await this.eventEmitter.on(event, listener);
  }
}
