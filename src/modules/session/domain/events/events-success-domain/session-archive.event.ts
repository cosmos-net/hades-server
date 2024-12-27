export class SessionArchivedEvent {
    constructor(
      public readonly uuid: string,
      public readonly archivedAt: Date,
    ) {}
  }