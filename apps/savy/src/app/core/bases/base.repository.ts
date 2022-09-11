import {
  ObjectLiteral,
  Repository,
  EntityTarget,
  FindOptionsWhere,
  UpdateResult,
  InsertResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';
import { myDataSource } from '../../../database';

export class BaseRepository<Entity extends ObjectLiteral> {
  repository: Repository<Entity>;
  constructor(entity: EntityTarget<Entity>) {
    this.repository = myDataSource.getRepository(entity) as Repository<Entity>;
  }

  async create(entityOrEntities: QueryDeepPartialEntity<Entity>| QueryDeepPartialEntity<Entity>[]) {
    // const entity = (await this.repository.create(entityOrEntities)) as Entity;
    const entity = await this.repository.insert(entityOrEntities) as InsertResult;
    return entity;
  }

  async update(entityOrEntities: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[] ,conflictPathsOrOptions: string[] | UpsertOptions<Entity>){
    const entity = (await this.repository.upsert(entityOrEntities,conflictPathsOrOptions)) as UpdateResult;

    return entity;
  }


  async getAll(): Promise<Entity[]> {
    const entity = (await this.repository.find()) as Entity[];
    return entity;
  }

  async getBy(item: FindOptionsWhere<Entity>): Promise<Entity | null> {
    const entity = (await this.repository.findOneBy({
      item,
    } as unknown as FindOptionsWhere<Entity>)) as Entity | null;
    return entity;
  }

  async delete(id: string) {
    return await this.repository.remove({ id } as unknown as Entity[]);
  }
}
