import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';

export class SessionStatusChangedEvent {
  constructor(public readonly root: ISessionSchemaPrimitives) {}
}
