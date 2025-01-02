import { ISessionSchemaPrimitives } from '@session/domain/schemas/session.schema-primitives';

export class SessionCreatedEvent {
  constructor(public readonly root: ISessionSchemaPrimitives) {}
}
