import { SessionModel } from '@session/domain/models/session.model';
import {
  IListSessionSchemaPrimitives,
  ISessionSchemaPrimitives,
} from '@session/domain/schemas/session.schema-primitives';

export class ListSessionModel {
  private readonly items: SessionModel[];
  private total: number;

  constructor(listSession: IListSessionSchemaPrimitives) {
    this.items = listSession.items.map((session): SessionModel => new SessionModel(session));
    this.total = listSession.total;
  }

  public get getItems(): ISessionSchemaPrimitives[] {
    return this.items.map((session): ISessionSchemaPrimitives => session.toPrimitives());
  }

  public get getItemModels(): SessionModel[] {
    return this.items;
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(sessions: ISessionSchemaPrimitives[]): void {
    this.setItems(sessions);
  }

  public archiveSessions(): void {
    this.items.forEach((session): void => session.archive());
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: ISessionSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: ISessionSchemaPrimitives): void {
    this.items.push(new SessionModel(item));
  }
}
