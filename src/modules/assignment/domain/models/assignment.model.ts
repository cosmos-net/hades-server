import { AggregateRoot } from '@nestjs/cqrs';

import { IAssignmentSchema } from '@assignment/domain/schemas/assignment.schema';
import {
  IAssignmentBaseSchema,
  IAssignmentSchemaPrimitives,
} from '@assignment/domain/schemas/assignment.schema-primitives';
import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import Title from '@common/domain/value-object/vos/name.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { RoleModel } from '@role/domain/models/role.model';
import { UserModel } from '@user/domain/models/user/user.model';

export class AssignmentModel extends AggregateRoot {
  private readonly _entityRoot: IAssignmentSchema;

  constructor(entity: IAssignmentSchemaPrimitives);
  constructor(assignmentBaseSchema: IAssignmentBaseSchema);
  constructor(entityOrAssignmentBaseSchema: IAssignmentSchemaPrimitives | IAssignmentBaseSchema) {
    super();
    this._entityRoot = {} as IAssignmentSchema;

    if ('id' in entityOrAssignmentBaseSchema) {
      this.hydrate(entityOrAssignmentBaseSchema);
    } else {
      this.hydrateWithBaseSchema(entityOrAssignmentBaseSchema);
    }
  }

  get id(): number | undefined {
    return this._entityRoot.id?._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get title(): string {
    return this._entityRoot.title._value;
  }

  get description(): string | undefined {
    return this._entityRoot.description?._value;
  }

  get createdAt(): Date {
    return this._entityRoot.createdAt._value;
  }

  get updatedAt(): Date {
    return this._entityRoot.updatedAt._value;
  }

  get archivedAt(): Date | undefined {
    return this._entityRoot.archivedAt?._value;
  }

  get user(): UserModel {
    return this._entityRoot.user;
  }

  get role(): RoleModel {
    return this._entityRoot.role;
  }

  public hydrate(entity: IAssignmentSchemaPrimitives): void {
    this._entityRoot.id = new Id(entity.id);
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.title = new Title(entity.title);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);

    this._entityRoot.user = new UserModel(entity.user);
    this._entityRoot.role = new RoleModel(entity.role);

    if (entity.description) this._entityRoot.description = new Description(entity.description);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
  }

  public hydrateWithBaseSchema(entity: IAssignmentBaseSchema): void {
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.user = entity.user;
    this._entityRoot.role = entity.role;

    const userTitle = entity.user.id;
    const roleTitle = entity.role.name;
    const title = `${userTitle} - ${roleTitle}`;

    this._entityRoot.title = new Title(title);
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    if (entity.description) this._entityRoot.description = new Description(entity.description);
  }

  public toPrimitives(): IAssignmentSchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
      user: this.user,
      role: this.role,
    };
  }

  public toPartialPrimitives(): Partial<IAssignmentSchemaPrimitives> {
    return {
      ...(this.id && { id: this.id }),
      ...(this.uuid && { uuid: this.uuid }),
      ...(this.title && { title: this.title }),
      ...(this.description && { description: this.description }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
    };
  }

  public static fromPrimitives(entity: IAssignmentBaseSchema): AssignmentModel {
    return new AssignmentModel(entity);
  }

  public useUser(user: UserModel): void {
    this._entityRoot.user = user;
  }

  public useRole(role: RoleModel): void {
    this._entityRoot.role = role;
  }

  public create(): void {
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    // this.apply(new AssignmentCreatedEvent(this.toPrimitives()));
  }

  public redescribe({ title, description }: { title?: string; description?: string }): void {
    if (title) {
      const isTitleChanged = this.title !== title;

      if (!isTitleChanged) {
        //TODO: Create a custom exception
        throw new Error('Title is the same');
      }

      this._entityRoot.title = new Title(title);
      this._entityRoot.updatedAt = new UpdatedAt(new Date());

      // this.apply(new AssignmentTitleRedescribedEvent(this.toPrimitives()));
    }

    if (description) {
      const isDescriptionChanged = this.description !== description;

      if (!isDescriptionChanged) {
        //TODO: Create a custom exception
        throw new Error('Description is the same');
      }

      this._entityRoot.description = new Description(description);
      this._entityRoot.updatedAt = new UpdatedAt(new Date());

      // this.apply(new AssignmentDescriptionRedescribedEvent(this.toPrimitives()));
    }
  }

  public archive(): void {
    if (this.archivedAt) {
      //TODO: Create a custom exception
      throw new Error('Already archived');
    }

    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    // this.apply(new AssignmentArchivedEvent(this.toPrimitives()));
  }

  public restore(): void {
    if (!this.archivedAt) {
      //TODO: Create a custom exception
      throw new Error(`To restore, the assignment must be archived`);
    }

    this._entityRoot.archivedAt = null;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    // this.apply(new AssignmentRestoredEvent(this.toPrimitives()));
  }

  public delete(): void {
    if (!this.archivedAt) {
      //TODO: Create a custom exception
      throw new Error(`To delete, the assignment must be archived`);
    }

    // this.apply(new AssignmentDeletedEvent(this.toPrimitives()));
  }

  reAssignRole(role: RoleModel): void {
    if (this.role.uuid === role.uuid) {
      throw new Error('Role is the same');
    }

    const userTitle = this.user.id;
    const roleTitle = role.name;
    const title = `${userTitle} - ${roleTitle}`;

    this._entityRoot.title = new Title(title);

    this._entityRoot.role = role;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    // this.apply(new AssignmentRoleReassignedEvent(this.toPrimitives()));
  }
}
