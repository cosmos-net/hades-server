import { Column } from 'typeorm';

import { PROFILE_ADDRESS } from '@user/domain/constants/general-rules';

export class Address {
  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.STREET.MAX_LENGTH,
    nullable: false,
  })
  street: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.EXT_NUMBER.MAX_LENGTH,
    nullable: false,
  })
  extNumber: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.INT_NUMBER.MAX_LENGTH,
    nullable: true,
  })
  intNumber: string | null;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.NEIGHBORHOOD.MAX_LENGTH,
    nullable: false,
  })
  neighborhood: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.ZIP_CODE.MAX_LENGTH,
    nullable: false,
  })
  zipCode: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.CITY.MAX_LENGTH,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.STATE.MAX_LENGTH,
    nullable: false,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: PROFILE_ADDRESS.COUNTRY.MAX_LENGTH,
    nullable: false,
  })
  country: string;
}
