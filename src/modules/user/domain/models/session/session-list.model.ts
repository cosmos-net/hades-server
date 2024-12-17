import { SessionModel } from '@user/domain/models/session/session.model';
import {
  IListSessionSchemaPrimitive,
  ISessionSchemaPrimitive,
} from '@user/domain/schemas/session/session.schema-primitive';

export class ListSessionModel {
  private readonly items: SessionModel[];
  private total: number;

  constructor(listSession: IListSessionSchemaPrimitive) {
    this.items = listSession.items.map((session) => new SessionModel(session));
    this.total = listSession.total;
  }

  public get getItems(): ISessionSchemaPrimitive[] {
    return this.items.map((session) => session.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(sessions: ISessionSchemaPrimitive[]) {
    this.setItems(sessions);
  }

  public archiveSessions() {
    this.items.forEach((session) => session.archive());
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setItems(items: ISessionSchemaPrimitive[]) {
    items.forEach((item) => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: ISessionSchemaPrimitive) {
    this.items.push(new SessionModel(item));
  }
}
