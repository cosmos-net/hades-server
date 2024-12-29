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
import exceptionMapping from '@helpers/exceptions/exception-mapping.helper';

type StructureError = {
  statusCode: number;
  message: string;
};

const INTERNAL_SERVER_ERROR = 500;

export default function handleDomainException(error: DomainException): StructureError {
  const exceptionType = error.constructor as typeof DomainException;

  if (exceptionMapping.has(exceptionType)) {
    return {
      statusCode: exceptionMapping.get(exceptionType),
      message: error.message,
    };
  }

  if (
    error instanceof BusinessConflictDomainException ||
    error instanceof ConcurrencyDomainException ||
    error instanceof DependencyViolationDomainException
  ) {
    return {
      statusCode: 409,
      message: error.message,
    };
  }

  if (
    error instanceof DomainLimitExceededDomainException ||
    error instanceof InsufficientFundsDomainException ||
    error instanceof InvalidOperationDomainException
  ) {
    return {
      statusCode: 400,
      message: error.message,
    };
  }

  if (
    error instanceof DomainNotAllowedDomainException ||
    error instanceof UnauthorizedAccessDomainException
  ) {
    return {
      statusCode: 403,
      message: error.message,
    };
  }

  if (error instanceof ResourceNotFoundDomainException) {
    return {
      statusCode: 404,
      message: error.message,
    };
  }

  if (error instanceof ValidationDomainException) {
    return {
      statusCode: 400,
      message: error.message,
    };
  }

  return {
    statusCode: INTERNAL_SERVER_ERROR,
    message: error.message,
  };
}
