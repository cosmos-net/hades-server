import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';
import ConcurrencyDomainException from '@common/domain/exceptions/concurrency.exception';
import DependencyViolationDomainException from '@common/domain/exceptions/dependency-violation.exception';
import DomainLimitExceededDomainException from '@common/domain/exceptions/domain-limit-exceeded.exception';
import DomainNotAllowedDomainException from '@common/domain/exceptions/domain-not-allowed.exception';
import DomainException from '@common/domain/exceptions/domain.exception';
import InsufficientFundsDomainException from '@common/domain/exceptions/insufficient-funds.exception';
import InvalidOperationDomainException from '@common/domain/exceptions/invalid-operation.exception';
import ResourceNotFoundDomainException from '@common/domain/exceptions/resource-not-found.exception';
import UnauthorizedAccessDomainException from '@common/domain/exceptions/unauthorized-access.exception';
import ValidationDomainException from '@common/domain/exceptions/validation.exception';

const exceptionMappingHelper = new Map<typeof DomainException, number>([
  [BusinessConflictDomainException, 409],
  [ConcurrencyDomainException, 409],
  [DependencyViolationDomainException, 409],
  [DomainLimitExceededDomainException, 400],
  [DomainNotAllowedDomainException, 403],
  [InsufficientFundsDomainException, 400],
  [InvalidOperationDomainException, 400],
  [ResourceNotFoundDomainException, 404],
  [UnauthorizedAccessDomainException, 403],
  [ValidationDomainException, 400],
]);

export default exceptionMappingHelper;
