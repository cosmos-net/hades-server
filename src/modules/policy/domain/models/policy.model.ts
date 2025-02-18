import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { IPolicySchema } from '@policy/domain/schemas/policy.schema';
import {
  IPolicyBaseSchema,
  IPolicySchemaPrimitives,
} from '@policy/domain/schemas/policy.schema-primitives';
import Description from '@policy/domain/value-objects/description.vo';
import Title from '@policy/domain/value-objects/title.vo';
import { RoleModel } from '@role/domain/models/role.model';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';

export class PolicyModel extends AggregateRoot {
  private readonly _entityRoot: IPolicySchema;
  constructor(entity: IPolicySchemaPrimitives);
  constructor(policyBaseSchema: IPolicyBaseSchema);
  constructor(entityOrPolicyBaseSchema: IPolicySchemaPrimitives | IPolicyBaseSchema) {
    super();
    this._entityRoot = {} as IPolicySchema;

    if ('id' in entityOrPolicyBaseSchema) {
      this.hydrate(entityOrPolicyBaseSchema);
    } else {
      this.hydrateWithBaseSchema(entityOrPolicyBaseSchema);
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

  get role(): RoleModel {
    return this._entityRoot.role;
  }

  get permissionList(): ListPermissionModel {
    return this._entityRoot.permissionList;
  }

  public toPrimitives(): IPolicySchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
      role: this.role,
    };
  }
  public hydrate(entity: IPolicySchemaPrimitives): void {
    this._entityRoot.id = new Id(entity.id);
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.title = new Title(entity.title);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);

    if (entity.role) {
      this._entityRoot.role = new RoleModel(entity.role);
    }

    if (entity.description) this._entityRoot.description = new Description(entity.description);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
  }

  public hydrateWithBaseSchema(entity: IPolicyBaseSchema): void {
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.role = entity.role;

    const permissionTitle = entity.permissionList.getItems;
    const roleTitle = entity.role.name;
    const title = `${permissionTitle} - ${roleTitle}`;

    this._entityRoot.title = new Title(title);
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    if (entity.description) this._entityRoot.description = new Description(entity.description);
  }

  public toPartialPrimitives(): Partial<IPolicySchemaPrimitives> {
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

  public create(): void {}

  public redescribe(): void {}

  public archive(): void {}

  public unarchive(): void {}

  public destroy(): void {}
}
