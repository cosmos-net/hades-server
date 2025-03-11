import { AggregateRoot } from '@nestjs/cqrs';

import ArchivedAt from '@common/domain/value-object/vos/archived-at.vo';
import CreatedAt from '@common/domain/value-object/vos/created-at.vo';
import Description from '@common/domain/value-object/vos/description.vo';
import Id from '@common/domain/value-object/vos/id.vo';
import UpdatedAt from '@common/domain/value-object/vos/updated-at.vo';
import UUID from '@common/domain/value-object/vos/uuid.vo';
import { PermissionArchivedEvent } from '@permission/domain/events/permission-archived.event';
import { PermissionCreatedEvent } from '@permission/domain/events/permission-created.event';
import { PermissionDescriptionRedescribedEvent } from '@permission/domain/events/permission-description-redescribed.event';
import { PermissionDestroyedEvent } from '@permission/domain/events/permission-destroyed.event';
import { PermissionModuleReplacedEvent } from '@permission/domain/events/permission-module-replaced.event';
import { PermissionSubmoduleReplacedEvent } from '@permission/domain/events/permission-submodule-replaced.event';
import { PermissionUnarchivedEvent } from '@permission/domain/events/permission-unarchived.event';
import { PermissionAlreadyIsArchivedException } from '@permission/domain/exceptions/permission-already-is-archived.exception';
import { PermissionAlreadyNotArchivedException } from '@permission/domain/exceptions/permission-already-not-archived.exception';
import { PermissionValueIsSameException } from '@permission/domain/exceptions/permission-value-is-same.exception';
import { IPermissionSchema } from '@permission/domain/schemas/permission.schema';
import {
  ICreatePermissionType,
  IPermissionSchemaPrimitives,
} from '@permission/domain/schemas/permission.schema-primitives';
import { Action } from '@permission/domain/value-objects/action.vo';
import { Module } from '@permission/domain/value-objects/module.vo';
import { Submodule } from '@permission/domain/value-objects/submodule.vo';

export class PermissionModel extends AggregateRoot {
  private readonly _entityRoot: IPermissionSchema;

  constructor(entity: IPermissionSchema) {
    super();
    this._entityRoot = {} as IPermissionSchema;
    this.hydrate(entity);
  }

  // Getters
  get id(): number {
    return this._entityRoot.id._value;
  }

  get uuid(): string {
    return this._entityRoot.uuid._value;
  }

  get path(): string {
    const action = `action-${this.action.name}/`;
    const module = `module-${this.module.name}/`;
    const submodule = this.submodule ? `submodule-${this.submodule.name}/` : '';
    const path = `${action}${module}${submodule}`;

    return path;
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
    return this._entityRoot.submodule;
  }

  public hydrate(entity: IPermissionSchema): void {
    this._entityRoot.id = entity.id ?? undefined;
    this._entityRoot.uuid = entity.uuid;
    this._entityRoot.description = entity.description ?? undefined;
    this._entityRoot.createdAt = entity.createdAt;
    this._entityRoot.updatedAt = entity.updatedAt;
    this._entityRoot.archivedAt = entity.archivedAt ?? undefined;
    this._entityRoot.action = entity.action;
    this._entityRoot.module = entity.module;
    this._entityRoot.submodule = entity.submodule ?? undefined;
  }

  public hydrateFromPrimitives(entity: IPermissionSchemaPrimitives): void {
    const vos = PermissionModel.generateVOS(entity);
    this.hydrate(vos);
  }

  // Serialization methods
  public toPrimitives(): IPermissionSchemaPrimitives {
    const primitives: IPermissionSchemaPrimitives = {
      id: this.id,
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      action: this.action,
      module: this.module,
    };

    if (this.description) primitives.description = this.description;
    if (this.archivedAt) primitives.archivedAt = this.archivedAt;
    if (this.submodule) primitives.submodule = this.submodule;

    return primitives;
  }

  public toPartialPrimitives(): Partial<IPermissionSchemaPrimitives> {
    return {
      ...(this.id && { id: this.id }),
      ...(this.uuid && { uuid: this.uuid }),
      ...(this.description && { description: this.description }),
      ...(this.createdAt && { createdAt: this.createdAt }),
      ...(this.updatedAt && { updatedAt: this.updatedAt }),
      ...(this.archivedAt && { archivedAt: this.archivedAt }),
      ...(this.action && { action: this.action }),
      ...(this.module && { module: this.module }),
      ...(this.submodule && { submodule: this.submodule }),
    };
  }

  // Factory methods
  public static fromPrimitives(entity: IPermissionSchemaPrimitives): PermissionModel {
    const vos = PermissionModel.generateVOS(entity);

    return new PermissionModel(vos);
  }

  public static generateVOS(entity: IPermissionSchemaPrimitives): IPermissionSchema {
    return {
      id: entity.id ? new Id(entity.id) : undefined,
      uuid: new UUID(entity.uuid),
      description: entity.description ? new Description(entity.description) : undefined,
      action: new Action(entity.action.id, entity.action.name),
      module: new Module(entity.module.id, entity.module.name),
      submodule: entity.submodule
        ? new Submodule(entity.submodule.id, entity.submodule.name)
        : undefined,
      createdAt: new CreatedAt(entity.createdAt),
      updatedAt: new UpdatedAt(entity.updatedAt),
      archivedAt: entity.archivedAt ? new ArchivedAt(entity.archivedAt) : undefined,
    };
  }

  // Business logic methods
  public static create(params: ICreatePermissionType): PermissionModel {
    const { uuid, action, module, submodule, description } = params;

    const entity = {
      uuid: new UUID(uuid),
      action: new Action(action.id, action.name),
      module: new Module(module.id, module.name),
      submodule: submodule ? new Submodule(submodule.id, submodule.name) : undefined,
      description: description ? new Description(description) : undefined,
      createdAt: new CreatedAt(new Date()),
      updatedAt: new UpdatedAt(new Date()),
    };

    const permission = new PermissionModel(entity);
    permission.apply(new PermissionCreatedEvent(permission));

    return permission;
  }

  public redescribe(description: string): void {
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
      throw new PermissionAlreadyIsArchivedException('Permission is already archived');
    }

    this._entityRoot.archivedAt = new ArchivedAt(new Date());
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionArchivedEvent(this));
  }

  public unarchive(): void {
    if (!this.archivedAt) {
      throw new PermissionAlreadyNotArchivedException(
        `The permission ${this.uuid} requires to be archived first to be unarchived`,
      );
    }

    this._entityRoot.archivedAt = null;
    this._entityRoot.updatedAt = new UpdatedAt(new Date());

    this.apply(new PermissionUnarchivedEvent(this));
  }

  public destroy(uuid: string): void {
    if (!this.archivedAt) {
      throw new PermissionAlreadyNotArchivedException(
        `Permission with uuid ${uuid} requires to be archived before destroyed`,
      );
    }
    this.apply(new PermissionDestroyedEvent(this));
  }

  public replaceOrigin(module: Module, submodule?: Submodule): void {
    const isSubmoduleChanged = this.submodule?.id !== submodule?.id;
    const isSameModule = this.module.id === module.id;
    const isNothingChanged = !isSubmoduleChanged && isSameModule;

    if (isNothingChanged) {
      throw new PermissionValueIsSameException('Module is the same');
    }

    this._entityRoot.module = module;
    if (submodule) {
      this._entityRoot.submodule = submodule;
    }
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
