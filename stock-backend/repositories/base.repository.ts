import {
  type Attributes,
  type CountOptions,
  type CreateOptions,
  type DestroyOptions,
  type FindOptions,
  type Model,
  type ModelStatic,
  type UpdateOptions,
} from "sequelize";
import {
  type Col,
  type Fn,
  type Literal,
  type MakeNullishOptional,
} from "sequelize/types/utils";

export abstract class BaseRepository<T extends Model> {
  constructor(protected model: ModelStatic<T>) {}

  async find(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findOne(options?: FindOptions<Attributes<T>>): Promise<T | null> {
    return await this.model.findOne(options);
  }

  async delete(options?: DestroyOptions<Attributes<T>>): Promise<number> {
    return await this.model.destroy(options);
  }

  async update(
    data: {
      [key in keyof Attributes<T>]?:
        | Fn
        | Col
        | Literal
        | Attributes<T>[key]
        | undefined;
    },
    options: Omit<UpdateOptions<Attributes<T>>, "returning"> & {
      returning: Exclude<
        UpdateOptions<Attributes<T>>["returning"],
        undefined | false
      >;
    }
  ): Promise<[affectedCount: number, affectedRows: T[]]> {
    return await this.model.update(data, options);
  }

  async create(
    data: MakeNullishOptional<T["_creationAttributes"]>,
    options?: CreateOptions<Attributes<T>> | undefined
  ): Promise<T> {
    return await this.model.create(data, options);
  }
}