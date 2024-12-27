import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { v4 as UUIDv4 } from 'uuid';

import { CMDS_HADES } from '@common/infrastructure/controllers/constants';
import { CreateUserCommand } from '@user/application/commands/use-cases/create-user/create-user.command';
import { CreateUserInput } from '@user/infrastructure/controllers/commands/create-user/create-user-input.dto';
import { CreateUserOutputDto } from '@user/infrastructure/controllers/commands/create-user/create-user-output.dto';

@Controller()
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: CMDS_HADES.USER.CREATE })
  async create(@Payload() createUserDto: CreateUserInput): Promise<CreateUserOutputDto> {
    const accounts = createUserDto.account.map((account) => ({ ...account, uuid: UUIDv4() }));
    const profile = { ...createUserDto.profile, uuid: UUIDv4() };

    return this.commandBus.execute(
      new CreateUserCommand({
        accounts,
        profile,
      }),
    );
  }
}
