import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { MediatorStoreService } from '@common/infrastructure/services/mediator-store-service/mediator-store.service';

@Injectable()
export class ArchiveAssignmentsHandler implements OnModuleInit {
  private readonly logger = new Logger(ArchiveAssignmentsHandler.name);

  constructor(
    // private readonly assignmentRepository: AssignmentRepository,
    private readonly mediator: MediatorStoreService,
  ) {}

  onModuleInit(): void {
    this.mediator.subscribe<{ userId: string }>(
      'user.archived',
      async ({ userId }): Promise<void> => {
        this.logger.log(`Archiving assignments for user: ${userId}`);
        // await this.assignmentRepository.archiveByUserId(userId);
      },
    );
  }
}
