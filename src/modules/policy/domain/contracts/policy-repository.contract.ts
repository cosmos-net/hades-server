import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { PolicyModel } from '@policy/domain/models/policy.model';

export abstract class IPolicyRepositoryContract {
  abstract persist(policy: PolicyModel): Promise<PolicyModel>;
  abstract getOneByUUID(UUID: string, options?: IOptions): Promise<PolicyModel | null>;
  abstract getOneByRoleUUID(userUUID: string, options?: IOptions): Promise<PolicyModel | null>;
  abstract getOneByPermissionUUID(
    permissionUUID: string,
    options?: IOptions,
  ): Promise<PolicyModel | null>;
  abstract getOneByCombination({
    uuid,
    roleUUID,
    permissionUUID,
    options,
  }: {
    uuid?: string;
    roleUUID?: string;
    permissionUUID?: string;
    options?: IOptions;
  }): Promise<PolicyModel | null>;
  abstract getByPermissionUUIDs(
    permissionUUIDs: string[],
    options?: IOptions,
  ): Promise<ListPolicyModel>;
  abstract getOneByTitle(title: string, options?: IOptions): Promise<PolicyModel | null>;
  abstract getOneByDescription(
    description: string,
    options?: IOptions,
  ): Promise<PolicyModel | null>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListPolicyModel>;
}
