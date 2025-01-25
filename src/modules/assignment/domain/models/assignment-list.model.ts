import { AssignmentModel } from '@assignment/domain/models/assignment.model';
import {
  IAssignmentSchemaPrimitives,
  IListAssignmentSchemaPrimitives,
} from '@assignment/domain/schemas/assignment.schema-primitives';

export class ListAssignmentModel {
  private readonly items: AssignmentModel[];
  private total: number;

  constructor(listAssignment: IListAssignmentSchemaPrimitives) {
    this.items = listAssignment.items.map(
      (assignment): AssignmentModel => new AssignmentModel(assignment),
    );
    this.total = listAssignment.total;
  }

  public get getItems(): IAssignmentSchemaPrimitives[] {
    return this.items.map((assignment): IAssignmentSchemaPrimitives => assignment.toPrimitives());
  }

  public get getTotal(): number {
    return this.total;
  }

  public hydrate(assignments: IAssignmentSchemaPrimitives[]): void {
    this.setItems(assignments);
  }

  private setTotal(total: number): void {
    this.total = total;
  }

  private setItems(items: IAssignmentSchemaPrimitives[]): void {
    items.forEach((item): void => this.addItems(item));
    this.setTotal(items.length);
  }

  private addItems(item: IAssignmentSchemaPrimitives): void {
    this.items.push(new AssignmentModel(item));
  }
}
