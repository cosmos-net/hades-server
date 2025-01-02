import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';

interface IListSessionOutputDto {
  id?: number;
  uuid: string;
  sessionId: string;
  sessionType: string;
  sessionDuration: number;
  sessionClosedType: string;
  token: string;
  expiresInAt: Date;
  loggedInAt: Date;
  loggedOutAt?: Date;
  ipAddress: string;
  refreshToken: string;
  userAgent: string;
  failedAttempts: number;
  origin: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export class ListSessionOutputDto extends PaginationOutputDto<IListSessionOutputDto> {
  constructor(items: IListSessionOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
