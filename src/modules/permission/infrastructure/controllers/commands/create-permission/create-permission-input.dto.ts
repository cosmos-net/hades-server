import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';

class Action {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class Module {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class Submodule {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreatePermissionInputDto {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type((): typeof Action => Action)
  action: Action;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type((): typeof Module => Module)
  module: Module;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type((): typeof Submodule => Submodule)
  @IsOptional()
  submodule?: Submodule;
}
