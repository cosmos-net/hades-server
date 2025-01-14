import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';

export class SessionFailedAttemptsIncrementedEvent {
  constructor(public readonly root: ISessionSchemaPrimitives) {}
}
