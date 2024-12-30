import { SessionModel } from '@session/domain/models/session.model';
import {
  IListSessionSchemaPrimitive,
  ISessionSchemaPrimitive,
} from '@session/domain/schemas/session.schema-primitive';

export class ListSessionModel {
  private readonly items: SessionModel[];
  private total: number;

  constructor(listSession: IListSessionSchemaPrimitive) {
    this.items = listSession.items.map((session): SessionModel => new SessionModel(session));
    this.total = listSession.total;
  }

  public get getItems(): ISessionSchemaPrimitive[] {
    return this.items.map((session): ISessionSchemaPrimitive => session.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(sessions: ISessionSchemaPrimitive[]): void {
    this.setItems(sessions);
  }

  public archiveSessions(): void {
    this.items.forEach((session): void => session.archive());
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: ISessionSchemaPrimitive[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: ISessionSchemaPrimitive): void {
    this.items.push(new SessionModel(item));
  }
}
