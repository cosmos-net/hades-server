import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import Title from '@common/domain/value-object/vos/name.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { PermissionArchivedEvent } from '@permission/domain/events/permission-archived.event';
import { PermissionCreatedEvent } from '@permission/domain/events/permission-created.event';
import { PermissionDescriptionRedescribedEvent } from '@permission/domain/events/permission-description-redescribed.event';
import { PermissionModuleReplacedEvent } from '@permission/domain/events/permission-module-replaced.event';
import { PermissionSubmoduleReplacedEvent } from '@permission/domain/events/permission-submodule-replaced.event';
import { PermissionUnarchivedEvent } from '@permission/domain/events/permission-unarchived.event';
import { PermissionAlreadyIsArchived } from '@permission/domain/exceptions/permission-already-is-archived';
import { PermissionAlreadyNotArchived } from '@permission/domain/exceptions/permission-already-not-archived';
import { PermissionValueIsSameException } from '@permission/domain/exceptions/permission-value-is-same.exception';
import { IPermissionSchema } from '@permission/domain/schemas/permission.schema';
import {
  IPermissionBaseSchema,
  IPermissionSchemaPrimitives,
} from '@permission/domain/schemas/permission.schema-primitives';
import { Action } from '@permission/domain/value-objects/action.vo';
import { Module } from '@permission/domain/value-objects/module.vo';
import { Submodule } from '@permission/domain/value-objects/submodule.vo';

export class PermissionModel extends AggregateRoot {
  private readonly _entityRoot: IPermissionSchema;

  constructor(entity: IPermissionSchemaPrimitives);
  constructor(permissionBaseSchema: IPermissionBaseSchema);
  constructor(entityOrPermissionBaseSchema: IPermissionSchemaPrimitives | IPermissionBaseSchema) {
    super();
    this._entityRoot = {} as IPermissionSchema;

    if ('id' in entityOrPermissionBaseSchema) {
      this.hydrate(entityOrPermissionBaseSchema);
    } else {
      this.hydrateWithBaseSchema(entityOrPermissionBaseSchema);
    }
  }

  get id(): number {
    return this._entityRoot.id._value;
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

  get action(): Action {
    return this._entityRoot.action;
  }

  get module(): Module {
    return this._entityRoot.module;
  }

  get submodule(): Submodule | undefined {
    return this._entityRoot?.submodule;
  }

  public hydrate(entity: IPermissionSchemaPrimitives): void {
    this._entityRoot.id = new Id(entity.id);
    this._entityRoot.uuid = new UUID(entity.uuid);
    this._entityRoot.title = new Title(entity.title);
    this._entityRoot.createdAt = new CreatedAt(entity.createdAt);
    this._entityRoot.updatedAt = new UpdatedAt(entity.updatedAt);

    if (entity.description) this._entityRoot.description = new Description(entity.description);
    if (entity.archivedAt) this._entityRoot.archivedAt = new ArchivedAt(entity.archivedAt);
  }

  public hydrateWithBaseSchema(entity: IPermissionBaseSchema): void {
    this._entityRoot.uuid = new UUID(entity.uuid);

    const actionTitle = entity.action.name;
    const moduleTitle = entity.module.name;
    const submoduleTitle = entity.submodule?.name ?? '';

    const title = `${actionTitle} - ${moduleTitle} - ${submoduleTitle}`;

    this._entityRoot.title = new Title(title);
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    if (entity.description) this._entityRoot.description = new Description(entity.description);
  }

  public toPrimitives(): IPermissionSchemaPrimitives {
    return {
      id: this.id,
      uuid: this.uuid,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      archivedAt: this.archivedAt,
      action: {
        id: this.action.id,
        name: this.action.name,
      },
      module: {
        id: this.module.id,
        name: this.module.name,
      },
      submodule: {
        id: this.submodule.id,
        name: this.submodule.name,
      },
    };
  }

  public toPartialPrimitives(): Partial<IPermissionSchemaPrimitives> {
    return {
      ...(this.id && { id: this.id }),
      ...(this.uuid && { uuid: this.uuid }),
      ...(this.title && { title: this.title }),
      ...(this.description && { description: this.description }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
      ...(this.action && { action: this.action }),
      ...(this.module && { module: this.module }),
      ...(this.submodule && { submodule: this.submodule }),
    };
  }

  public static fromPrimitives(entity: IPermissionBaseSchema): PermissionModel {
    return new PermissionModel(entity);
  }

  public create(): void {
    this._entityRoot.createdAt = new CreatedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionCreatedEvent(this));
  }

  public redescribe({ description }: { description?: string }): void {
    if (description) {
      const isDescriptionChanged = this.description !== description;

      if (!isDescriptionChanged) {
        throw new PermissionValueIsSameException('Description is the same');
      }

      this._entityRoot.description = new Description(description);
      this._entityRoot.updatedAt = new UpdatedAt(new Date());

      this.apply(new PermissionDescriptionRedescribedEvent(this));
    }
  }

  public archive(): void {
    if (this.archivedAt) {
      throw new PermissionAlreadyIsArchived('Permission is already archived');
    }

    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionArchivedEvent(this));
  }

  public unarchive(): void {
    if (!this.archivedAt) {
      throw new PermissionAlreadyNotArchived(
        `The permission ${this.uuid} requires to be archived first to be unarchived`,
      );
    }

    this._entityRoot.archivedAt = null;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionUnarchivedEvent(this));
  }

  public destroy(): void {
    this.apply(new PermissionArchivedEvent(this));
  }

  public replaceModule(module: Module, submodule?: Submodule): void {
    const isSubmoduleChanged = this.submodule?.id !== submodule?.id;
    const isSameModule = this.module.id === module.id;
    const isNothingChanged = !isSubmoduleChanged && isSameModule;

    if (isNothingChanged) {
      throw new PermissionValueIsSameException('Module is the same');
    }

    this._entityRoot.module = module;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionModuleReplacedEvent(this));
  }

  public replaceSubmodule(submodule: Submodule): void {
    const isSubmoduleChanged = this.submodule?.id !== submodule.id;

    if (!isSubmoduleChanged) {
      throw new PermissionValueIsSameException(`Submodule is the same`);
    }

    this._entityRoot.submodule = submodule;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionSubmoduleReplacedEvent(this));
  }
}
