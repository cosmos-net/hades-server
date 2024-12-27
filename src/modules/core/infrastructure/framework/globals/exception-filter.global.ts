import { Catch, ArgumentsHost, Logger, RpcExceptionFilter } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';

interface IError {
  message?: string;
  name?: string;
  status?: number;
}

interface IBodyResponse {
  data: unknown;
  timestamp: string;
  path: string;
  method: string;
  stacktrace?: string;
  error?: IError | string;
}

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(ExceptionFilter.name);
  constructor(private readonly config: ConfigService) {}

  catch(exception: RpcException, host: ArgumentsHost): Observable<unknown> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const error = exception.getError();
    const isProduction = this.config.get<string>('servers.serverEnv') === 'production';

    let bodyResponse: IBodyResponse = {
      data: {},
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(!isProduction && { stacktrace: exception.stack }),
      error,
    };

    if (typeof error !== 'string') {
      const message = (error as IError).message ?? 'Internal Server Error';
      const name = (error as IError).name ?? 'Error';
      const status = (error as IError).status ?? 500;

      bodyResponse = {
        ...bodyResponse,
        error: {
          message,
          name,
          status,
        },
      };
    }

    this.logger.error(`Error: ${JSON.stringify(bodyResponse)}`);
    return throwError((): IBodyResponse => bodyResponse);
  }
}
