import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

import { PROFILE_ADDRESS } from '@user/domain/constants/general-rules';

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  @Length(PROFILE_ADDRESS.STREET.MIN_LENGTH, PROFILE_ADDRESS.STREET.MAX_LENGTH)
  public readonly street: string;

  @IsString()
  @IsNotEmpty()
  @Length(PROFILE_ADDRESS.EXT_NUMBER.MIN_LENGTH, PROFILE_ADDRESS.EXT_NUMBER.MAX_LENGTH)
  public readonly extNumber: string;

  @IsString()
  @IsOptional()
  @Length(PROFILE_ADDRESS.INT_NUMBER.MIN_LENGTH, PROFILE_ADDRESS.INT_NUMBER.MAX_LENGTH)
  public readonly intNumber?: string;

  @IsString()
  @IsNotEmpty()
  @Length(PROFILE_ADDRESS.NEIGHBORHOOD.MIN_LENGTH, PROFILE_ADDRESS.NEIGHBORHOOD.MAX_LENGTH)
  public readonly neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @Length(PROFILE_ADDRESS.ZIP_CODE.MIN_LENGTH, PROFILE_ADDRESS.ZIP_CODE.MAX_LENGTH)
  public readonly zipCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(PROFILE_ADDRESS.CITY.MIN_LENGTH, PROFILE_ADDRESS.CITY.MAX_LENGTH)
  public readonly city: string;

  @IsString()
  @Length(PROFILE_ADDRESS.STATE.MIN_LENGTH, PROFILE_ADDRESS.STATE.MAX_LENGTH)
  public readonly state: string;

  @IsString()
  @Length(PROFILE_ADDRESS.COUNTRY.MIN_LENGTH, PROFILE_ADDRESS.COUNTRY.MAX_LENGTH)
  public readonly country: string;
}
