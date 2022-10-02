import { Service } from 'typedi';
import {
  ObjectLiteral,
  Repository,
  EntityTarget,
  FindOptionsWhere,
  ObjectID,
  UpdateResult,
  DeepPartial,
  FindOneOptions,
  DeleteResult,
  Entity,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { myDataSource } from '../utils/database';

export class BaseRepository<Entity extends ObjectLiteral> {
  repository: Repository<Entity>;
  constructor(private entity: EntityTarget<Entity>) {
    this.repository = myDataSource.getRepository<Entity>(
      entity
    ) as Repository<Entity>;
  }

  async create(createEntity: DeepPartial<Entity>[]) {
    // const result = await this.repository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(this.entity)
    //   .values(createEntity)
    //   .execute();

    // return result.generatedMaps as Entity[];
    const entity = this.repository.create(createEntity) as Entity[];
    return (await this.repository.save(entity)) as Entity[];
  }

  async update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>
  ) {
    return (await this.repository.update(
      criteria,
      partialEntity
    )) as UpdateResult;
  }

  async getAll(): Promise<Entity[]> {
    return (await this.repository.find()) as Entity[];
  }

  async getBy(
    item: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]
  ): Promise<Entity | null> {
    return (await this.repository.findOneBy(item)) as Entity | null;
  }

  async get(item: FindOneOptions<Entity>): Promise<Entity | null> {
    return (await this.repository.findOne(item)) as Entity | null;
  }

  async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<Entity>
  ) {
    const deleted = (await this.repository.delete(criteria)) as DeleteResult;

    if (deleted.affected) return true;

    return false;
  }
}
