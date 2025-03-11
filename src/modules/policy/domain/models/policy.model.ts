import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { PolicyArchivedEvent } from '@policy/domain/events/policy-archived.event';
import { PolicyCreatedEvent } from '@policy/domain/events/policy-created.event';
import { PolicyDestroyedEvent } from '@policy/domain/events/policy-destroyed.event';
import { PolicyRedescribedEvent } from '@policy/domain/events/policy-redescribed.event';
import { PolicyUnarchivedEvent } from '@policy/domain/events/policy-unarchived.event';
import { PolicyIsArchiveException } from '@policy/domain/exceptions/policy-is-archive.exception';
import { PolicyIsNotArchiveException } from '@policy/domain/exceptions/policy-is-not-archive.exception';
import { PolicyIsSamePropertyException } from '@policy/domain/exceptions/policy-is-same-property.exception';
import {
  IPolicyNewParams,
  IPolicyPersistParams,
  IPolicySchema,
} from '@policy/domain/schemas/policy.schema';
import {
  ICreatePolicyPrimitives,
  IPolicySchemaPrimitives,
} from '@policy/domain/schemas/policy.schema-primitives';
import Description from '@policy/domain/value-objects/description.vo';
import Title from '@policy/domain/value-objects/title.vo';
import { RoleModel } from '@role/domain/models/role.model';

export class PolicyModel extends AggregateRoot {
  private readonly _entityRoot: IPolicySchema;

  constructor(entity: IPolicyNewParams);
  constructor(entity: IPolicyPersistParams);
  constructor(entity: IPolicyNewParams | IPolicyPersistParams) {
    super();
    this.hydrate(entity);
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

  get permission(): PermissionModel {
    return this._entityRoot.permission;
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
      role: this.role.toPrimitives(),
      permission: this.permission.toPrimitives(),
    };
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
    };
  }

  public static fromPrimitives(entity: IPolicySchemaPrimitives): PolicyModel {
    const vos = PolicyModel.buildValueObjects(entity);
    return new PolicyModel(vos);
  }

  public static buildValueObjects(entity: IPolicySchemaPrimitives): IPolicySchema {
    return {
      id: entity.id && new Id(entity.id),
      uuid: new UUID(entity.uuid),
      title: new Title(entity.title),
      description: entity.description && new Description(entity.description),
      createdAt: new CreatedAt(entity.createdAt),
      updatedAt: new UpdatedAt(entity.updatedAt),
      archivedAt: entity.archivedAt && new ArchivedAt(entity.archivedAt),
      role: RoleModel.fromPrimitives(entity.role),
      permission: PermissionModel.fromPrimitives(entity.permission),
    };
  }

  public hydrate(entity: IPolicyNewParams | IPolicyPersistParams): void {
    this._entityRoot.uuid = entity.uuid;
    this._entityRoot.title = new Title(
      `Permission=${entity.permission.path}/Role=${entity.role.name}`,
    );
    this._entityRoot.description = entity.description ?? undefined;
    this._entityRoot.role = entity.role;
    this._entityRoot.permission = entity.permission;

    const isPersistProcess = 'id' in entity;

    if (isPersistProcess) {
      this._entityRoot.id = entity.id;
      this._entityRoot.archivedAt = entity.archivedAt;
      this._entityRoot.createdAt = entity.createdAt;
      this._entityRoot.updatedAt = entity.updatedAt;
    } else {
      this._entityRoot.createdAt = new CreatedAt(new Date());
      this._entityRoot.updatedAt = new UpdatedAt(new Date());
    }
  }

  public hydrateFromPrimitive(partialEntity: Partial<IPolicySchemaPrimitives>): void {
    if (partialEntity.id) {
      this._entityRoot.id = new Id(partialEntity.id);
    }

    if (partialEntity.uuid) {
      this._entityRoot.uuid = new UUID(partialEntity.uuid);
    }

    if (partialEntity.title) {
      this._entityRoot.title = new Title(partialEntity.title);
    }

    if (partialEntity.description) {
      this._entityRoot.description = new Description(partialEntity.description);
    }

    if (partialEntity.createdAt) {
      this._entityRoot.createdAt = new CreatedAt(partialEntity.createdAt);
    }

    if (partialEntity.updatedAt) {
      this._entityRoot.updatedAt = new UpdatedAt(partialEntity.updatedAt);
    }

    if (partialEntity.archivedAt) {
      this._entityRoot.archivedAt = new ArchivedAt(partialEntity.archivedAt);
    }

    if (partialEntity.role) {
      this._entityRoot.role = RoleModel.fromPrimitives(partialEntity.role);
    }

    if (partialEntity.permission) {
      this._entityRoot.permission = PermissionModel.fromPrimitives(partialEntity.permission);
    }
  }

  public static create(params: ICreatePolicyPrimitives): PolicyModel {
    const uuid = new UUID(params.uuid);
    const description = params.description && new Description(params.description);

    const policyModel = new PolicyModel({
      uuid,
      description,
      role: params.role,
      permission: params.permission,
    });

    policyModel.apply(new PolicyCreatedEvent(policyModel));

    return policyModel;
  }

  public redescribe(description: string): void {
    const isSameDescription = this.description === description;

    if (isSameDescription) {
      throw new PolicyIsSamePropertyException(`
        The description ${description} is the same as the current one
      `);
    }

    this._entityRoot.description = new Description(description);
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PolicyRedescribedEvent(this));
  }
  public archive(): void {
    if (this.archivedAt) {
      throw new PolicyIsArchiveException(`This Policy ${this.uuid} is already archived`);
    }

    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PolicyArchivedEvent(this));
  }

  public unarchive(): void {
    if (!this.archivedAt) {
      throw new PolicyIsNotArchiveException(`
        The policy ${this.uuid} requires to be archived first to be unarchived
      `);
    }

    this._entityRoot.archivedAt = null;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PolicyUnarchivedEvent(this));
  }

  public destroy(): void {
    this.apply(new PolicyDestroyedEvent(this));
  }
}
