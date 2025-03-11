import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';

interface IListPolicyOutputDto {
  id?: number;
  uuid: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

export class ListPolicyOutputDto extends PaginationOutputDto<IListPolicyOutputDto> {
  constructor(items: IListPolicyOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
