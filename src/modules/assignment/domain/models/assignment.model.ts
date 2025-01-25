import { AggregateRoot } from '@nestjs/cqrs';

import { IAssignmentSchemaPrimitives } from '@assignment/domain/schemas/assignment.schema-primitives';

export class AssignmentModel extends AggregateRoot {
  constructor(root: IAssignmentSchemaPrimitives) {
    super();
    Object.assign(this, root);
  }
}
