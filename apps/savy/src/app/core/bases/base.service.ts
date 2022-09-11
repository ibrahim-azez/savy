import { Service } from 'typedi';
import { ObjectLiteral } from 'typeorm';
import { BaseRepository } from './base.repository';

@Service()
export class BaseService<T extends ObjectLiteral> {
  public baseRepository: BaseRepository<T>;
  constructor(entity: any) {
    this.baseRepository = new BaseRepository<T>(entity);
  }
}
