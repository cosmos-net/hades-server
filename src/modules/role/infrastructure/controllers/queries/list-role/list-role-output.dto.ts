import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';

interface IListRoleOutputDto {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export class ListRoleOutputDto extends PaginationOutputDto<IListRoleOutputDto> {
  constructor(items: IListRoleOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
