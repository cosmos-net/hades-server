import { PaginationOutputDto } from '@common/infrastructure/dtos/pagination-options/output-pagination.dto';
import { ProfileGenderEnum } from '@user/domain/constants/general-rules';

interface IListUserOutputDto {
  user: {
    id: string;
    uuid: string;
    status: string;
    account: {
      username: string;
      email: string;
    };
    profile: {
      name: string;
      lastName: string;
      secondLastName: string;
      phoneNumber: string;
      gender: ProfileGenderEnum;
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
      };
    };
  };
}

export class ListUserOutputDto extends PaginationOutputDto<IListUserOutputDto> {
  constructor(items: IListUserOutputDto[], page: number, limit: number, total: number) {
    super(items, page, limit, total);
  }
}
