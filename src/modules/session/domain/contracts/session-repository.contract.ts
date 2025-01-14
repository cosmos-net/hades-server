import { IOptions } from '@common/domain/contracts/options.contract';
import { Criteria } from '@common/domain/criteria/criteria';
import { ListSessionModel } from '@session/domain/models/session-list.model';
import { SessionModel } from '@session/domain/models/session.model';

export abstract class ISessionRepositoryContract {
  abstract persist(session: SessionModel): Promise<SessionModel>;
  abstract getOneBy(UUID: string, options?: IOptions): Promise<SessionModel | null>;
  abstract destroy(UUID: string): Promise<boolean>;
  abstract matching(criteria: Criteria): Promise<ListSessionModel>;
}
