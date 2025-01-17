import { Length } from 'class-validator';
import { Column } from 'typeorm';

import { PROFILE_ADDRESS } from '@user/domain/constants/general-rules';

export class Address {
  @Column({
    name: 'street',
    type: 'varchar',
    length: PROFILE_ADDRESS.STREET.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.STREET.MIN_LENGTH, PROFILE_ADDRESS.STREET.MAX_LENGTH)
  street: string;

  @Column({
    name: 'ext_number',
    type: 'varchar',
    length: PROFILE_ADDRESS.EXT_NUMBER.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.EXT_NUMBER.MIN_LENGTH, PROFILE_ADDRESS.EXT_NUMBER.MAX_LENGTH)
  extNumber: string;

  @Column({
    name: 'int_number',
    type: 'varchar',
    length: PROFILE_ADDRESS.INT_NUMBER.MAX_LENGTH,
    nullable: true,
  })
  @Length(PROFILE_ADDRESS.INT_NUMBER.MIN_LENGTH, PROFILE_ADDRESS.INT_NUMBER.MAX_LENGTH)
  intNumber: string | null;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: PROFILE_ADDRESS.NEIGHBORHOOD.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.NEIGHBORHOOD.MIN_LENGTH, PROFILE_ADDRESS.NEIGHBORHOOD.MAX_LENGTH)
  neighborhood: string;

  @Column({
    name: 'zip_code',
    type: 'varchar',
    length: PROFILE_ADDRESS.ZIP_CODE.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.ZIP_CODE.MIN_LENGTH, PROFILE_ADDRESS.ZIP_CODE.MAX_LENGTH)
  zipCode: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: PROFILE_ADDRESS.CITY.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.CITY.MIN_LENGTH, PROFILE_ADDRESS.CITY.MAX_LENGTH)
  city: string;

  @Column({
    name: 'state',
    type: 'varchar',
    length: PROFILE_ADDRESS.STATE.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.STATE.MIN_LENGTH, PROFILE_ADDRESS.STATE.MAX_LENGTH)
  state: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: PROFILE_ADDRESS.COUNTRY.MAX_LENGTH,
    nullable: false,
  })
  @Length(PROFILE_ADDRESS.COUNTRY.MIN_LENGTH, PROFILE_ADDRESS.COUNTRY.MAX_LENGTH)
  country: string;
}
