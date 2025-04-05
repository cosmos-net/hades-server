import { IPolicyRepositoryContract } from '@policy/domain/contracts/policy-repository.contract';
import { PolicyNotFoundException } from '@policy/domain/exceptions/policy-not-found.exception';
import { ListPolicyModel } from '@policy/domain/models/list-policy.model';
import { IDataMediatorServiceContract } from '@shared/domain/contracts/data-mediator-service.contract';

export class ListPoliciesByAccountDomainService {
  constructor(
    private readonly policyRepository: IPolicyRepositoryContract,
    private readonly dataMediatorService: IDataMediatorServiceContract,
  ) {}

  async go(accountUUID: string, withArchived: boolean): Promise<ListPolicyModel> {
    // Primero verificamos que la cuenta existe
    const accountModel = await this.dataMediatorService.account.get({
      uuid: accountUUID,
      withArchived: withArchived,
      failIfArchived: false,
    });

    // Obtenemos el usuario asociado a esta cuenta
    const userModel = await this.dataMediatorService.user.get({
      uuid: accountModel.user.uuid,
      withArchived: withArchived,
    });
    
    // Obtenemos las asignaciones de roles del usuario
    const assignments = await this.dataMediatorService.assignment.listByUserUUID({
      userUUID: userModel.uuid,
      withArchived: withArchived,
    });
     
    // Si no hay asignaciones, retornamos lista vacía
    if (assignments.getTotal === 0) {
      throw new PolicyNotFoundException(
        `No role assignments found for account with UUID ${accountUUID}`,
      );
    }
    
    // Obtenemos todos los roles asignados al usuario
    const roleUUIDs = assignments.getItemsModel.map(assignment => assignment.role.uuid);
    
    // Creamos un ListPolicyModel para almacenar todas las políticas
    const allPolicies = new ListPolicyModel();
    
    // Para cada rol, obtenemos sus políticas y las agregamos a la lista
    for (const roleUUID of roleUUIDs) {
      const policiesForRole = await this.policyRepository.listByRoleUUID(roleUUID, {
        withArchived,
        relations: ['role', 'permission'],
      });
      
      // Si el rol tiene políticas, las agregamos a nuestra lista completa
      if (policiesForRole.getTotal > 0) {
        policiesForRole.getItemsModel.forEach(policy => {
          allPolicies.add(policy);
        });
      }
    }
    
    // Verificamos si encontramos alguna política
    if (allPolicies.getTotal === 0) {
      throw new PolicyNotFoundException(
        `No policies found for account with UUID ${accountUUID}`,
      );
    }

    return allPolicies;
  }
}