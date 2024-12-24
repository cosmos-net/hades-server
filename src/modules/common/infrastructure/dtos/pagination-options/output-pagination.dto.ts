interface IPaginationMetadataDto {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export class PaginationOutputDto<T> {
  readonly items: T[] = [];
  readonly metadata: IPaginationMetadataDto = {} as IPaginationMetadataDto;

  constructor(items: T[], page: number, limit: number, total: number) {
    this.items = items;
    this.metadata.page = page;
    this.metadata.limit = limit;
    this.metadata.total = total;

    this.metadata.pages = Math.ceil(this.metadata.total / this.metadata.limit);
    this.metadata.hasPreviousPage = this.metadata.page > 1;
    this.metadata.hasNextPage = this.metadata.page < this.metadata.pages;
  }
}
