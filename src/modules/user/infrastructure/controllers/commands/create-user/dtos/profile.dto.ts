import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsDefined,
} from 'class-validator';

import {
  MAX_PROFILE_LAST_NAME_LENGTH,
  MIN_PROFILE_LAST_NAME_LENGTH,
  MAX_PROFILE_SECOND_LAST_NAME_LENGTH,
  MIN_PROFILE_SECOND_LAST_NAME_LENGTH,
  MAX_PROFILE_NAME_LENGTH,
  MIN_PROFILE_NAME_LENGTH,
  MAX_PROFILE_PHONE_NUMBER_LENGTH,
  MIN_PROFILE_PHONE_NUMBER_LENGTH,
  ProfileGenderEnum,
} from '@user/domain/constants/general-rules';
import { AddressDTO } from '@user/infrastructure/controllers/commands/create-user/dtos/address.dto';

export class ProfileDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(MIN_PROFILE_NAME_LENGTH, MAX_PROFILE_NAME_LENGTH, { each: true })
  @IsDefined()
  public readonly names: string[];

  @IsString()
  @IsNotEmpty()
  @Length(MIN_PROFILE_LAST_NAME_LENGTH, MAX_PROFILE_LAST_NAME_LENGTH)
  @IsDefined()
  public readonly lastName: string;

  @IsString()
  @IsOptional()
  @Length(MIN_PROFILE_SECOND_LAST_NAME_LENGTH, MAX_PROFILE_SECOND_LAST_NAME_LENGTH)
  public readonly secondLastName?: string;

  @IsString()
  @IsNotEmpty()
  @Length(MIN_PROFILE_PHONE_NUMBER_LENGTH, MAX_PROFILE_PHONE_NUMBER_LENGTH)
  @IsDefined()
  public readonly phoneNumber: string;

  @IsEnum(ProfileGenderEnum)
  @IsNotEmpty()
  @IsDefined()
  public readonly gender: ProfileGenderEnum;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDTO)
  @IsDefined()
  public readonly address: AddressDTO;
}
