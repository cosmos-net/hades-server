import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';

interface IListAssignmentOutputDto {
  id?: number;
  uuid: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export class ListAssignmentOutputDto extends PaginationOutputDto<IListAssignmentOutputDto> {
  constructor(items: IListAssignmentOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
