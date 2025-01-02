import {
  BadRequestException,
  HttpException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export class ValidationPipeWithExceptionFactory extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]): HttpException => {
        const errorMapped = this.flattenValidationErrors(errors);
        return new BadRequestException(errorMapped);
      },
    });
  }

  protected flattenValidationErrors(errors: ValidationError[], parentPath = ''): any[] {
    return errors.reduce((acc, error) => {
      const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;

      if (error.constraints) {
        acc.push({
          field: propertyPath,
          constraints: error.constraints,
        });
      }

      if (error.children && error.children.length > 0) {
        acc.push(...this.flattenValidationErrors(error.children, propertyPath));
      }

      return acc;
    }, [] as any[]);
  }
}
