import { OperatorsEnum } from '@common/domain/criteria/operators-enum';
import { OrderTypeEnum } from '@common/domain/criteria/orders/order-type-enum';
import { PrimitivesType } from '@common/domain/value-object/types/value-object';
import { PermissionAlreadyExistsError } from '@permission/domain/exceptions/permission-already-exists.exception';
import { PermissionNotFoundException } from '@permission/domain/exceptions/permission-not-found.exception';
import { ListPermissionModel } from '@permission/domain/models/permission-list.model';
import { PermissionModel } from '@permission/domain/models/permission.model';
import { IPolicyDataMediatorContract } from '@policy/domain/contracts/policy-data-mediator.contract';
import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyModel } from '@policy/domain/models/policy.model';
import { IPolicyBaseSchemaParams } from '@policy/domain/schemas/policy.schema-primitives';

export class CreatePolicyDomainService {
  constructor(
    private readonly policyRepository: IPolicyRepositoryContract,
    private readonly policyDataMediator: IPolicyDataMediatorContract,
  ) {}

  //REFACTOR: This method is doing too much, it should be split into smaller methods, cognitive complexity is too high from 17 of 15
  async createPolicy(policyBaseSchema: IPolicyBaseSchemaParams): Promise<PolicyModel> {
    const { roleUUID, permissionUUIDs } = policyBaseSchema;
    const issues = [];

    const role = await this.policyDataMediator.role.getByUUID({
      uuid: roleUUID,
      withArchived: true,
      failIfArchived: true,
    });

    const listPolicyModel = await this.policyRepository.getByPermissionUUIDs(permissionUUIDs, {
      withArchived: true,
    });

    if (listPolicyModel.getTotal === permissionUUIDs.length) {
      throw new PermissionAlreadyExistsError(`Policy already exists for all permissions`);
    }

    for (const policyItemModel of listPolicyModel.getItemsModel) {
      const message = `Policy is already exists ${policyItemModel.archive ? 'but it is archived' : ''}`;

      issues.push({
        uuid: policyItemModel.uuid,
        message,
      });
    }

    const permissionUUIDsAlreadyExists = issues.map((issue): string => issue.uuid);
    const permissionUUIDsToCreate = permissionUUIDs.filter(
      (permissionUUID): boolean => !permissionUUIDsAlreadyExists.includes(permissionUUID),
    );

    //TODO: Fix this resposability is from the use case
    const filtersMappers: Array<Map<string, PrimitivesType>> = [];
    const filtersMapper = new Map<string, PrimitivesType>();
    filtersMapper.set('field', 'uuid');
    filtersMapper.set('operator', OperatorsEnum.IN);
    filtersMapper.set('value', permissionUUIDsToCreate);
    filtersMappers.push(filtersMapper);

    const permissions = await this.policyDataMediator.permission.list({
      filtersMap: filtersMappers,
      withArchived: true,
      limit: permissionUUIDsToCreate.length,
      orderBy: 'uuid',
      orderType: OrderTypeEnum.ASC,
      offset: 0,
    });

    if (permissions.getTotal === 0) {
      throw new PermissionNotFoundException('All permissions do not exist');
    }

    const isSameQuantity = permissions.getTotal === permissionUUIDsToCreate.length;
    const permissionsFound: PermissionModel[] = [];
    if (!isSameQuantity) {
      for (const permissionUUID of permissionUUIDsToCreate) {
        const permissionExists = permissions.getItemsModel.find(
          (permission): boolean => permission.uuid === permissionUUID,
        );

        if (!permissionExists) {
          issues.push({
            uuid: permissionUUID,
            message: 'Permission does not exist',
          });
        } else {
          permissionsFound.push(permissionExists);
        }
      }
    }

    const permissionsOk: PermissionModel[] = [];
    for (const permission of permissionsFound) {
      if (permission.archive) {
        issues.push({
          uuid: permission.uuid,
          message: 'The permission was found but it is archived',
        });
      } else {
        permissionsOk.push(permission);
      }
    }

    if (permissionsOk.length === 0) {
      throw new PermissionNotFoundException('All permissions do not exist or are archived');
    }

    const permissionList = new ListPermissionModel({
      items: permissionsOk,
      total: permissionsOk.length,
    });

    const policyModel = new PolicyModel({
      uuid: policyBaseSchema.uuid,
      description: policyBaseSchema.description,
      role,
      permissionList,
    });

    policyModel.create();

    return policyModel;
  }
}
