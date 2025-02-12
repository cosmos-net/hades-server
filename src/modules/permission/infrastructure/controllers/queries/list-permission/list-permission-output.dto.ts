import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';

interface IListPermissionOutputDto {
  id?: number;
  uuid: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export class ListPermissionOutputDto extends PaginationOutputDto<IListPermissionOutputDto> {
  constructor(items: IListPermissionOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
