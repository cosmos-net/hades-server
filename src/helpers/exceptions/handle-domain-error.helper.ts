import DomainException from '@common/domain/exceptions/domain.exception';
import exceptionMapping from '@helpers/exceptions/exception-mapping.helper';

type StructureError = {
  statusCode: number;
  message: string;
};

const INTERNAL_SERVER_ERROR = 500;

export default function handleDomainError(
  error: DomainException,
): StructureError {
  const exceptionType = error.constructor as typeof DomainException;
  const statusCode =
    exceptionMapping.get(exceptionType) || INTERNAL_SERVER_ERROR;
  const message = error.message || 'Internal server error';

  return { statusCode, message };
}
