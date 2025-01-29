/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IMediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store-service.interface';

@Injectable()
export class MediatorStoreService implements IMediatorStoreService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish<T>(eventName: string, payload: T): Promise<any[]> {
    const response = await this.eventEmitter.emitAsync(eventName, payload);
    return response;
  }

  subscribe<T>(eventName: string, handler: (payload: T) => void): void {
    this.eventEmitter.on(eventName, handler);
  }
}
