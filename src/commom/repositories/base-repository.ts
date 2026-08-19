import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

type Query = {
  filter?: Record<string, unknown>;
  order?: Record<string, 'ASC' | 'DESC'>;
  search?: Record<string, unknown>;
  limit?: number;
  page: number;
  pageSize: number;
  unPaginated?: boolean;
  includes?: string;
};
interface FindOptions<T> {
  where?: FindOptionsWhere<T> | undefined;
  order?: FindOptionsOrder<T> | undefined;
  relations?: FindOptionsRelations<T> | undefined;
}

export class BaseRepository<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async findMany(query: Query): Promise<[T[], number]> {
    const findOptions = this.buildFindOptions(query);
    const paginationsOptions = this.buildPaginationsOptions(query);
    return await this.repository.findAndCount({
      ...findOptions,
      ...paginationsOptions,
    });
  }

  private buildFindOptions(query: Query): FindOptions<T> {
    let whereBulder: FindOptionsWhere<T> | undefined = {};
    let order: FindOptionsOrder<T> | undefined = {};
    let search: FindOptionsWhere<T> | undefined = {};
    let relations: FindOptionsRelations<T> | undefined = {};
    let includes: string[] | undefined = query.includes
      ? query.includes.split(',')
      : undefined;
    whereBulder = this.buildGenericClause(
      query.filter ? query.filter : undefined,
      whereBulder,
    );
    search = this.buildGenericClause(query.search, search);
    order = this.buildGenericClause(query.order, order);
    relations = this.buildRelationsOptions(includes);
    const where = this.mergeSearchAndFilterFindOptionsFromWhereMembers(
      whereBulder,
      search,
    );
    return { where, order, relations };
  }

  private buildRelationsOptions(
    includes: string[] | undefined,
  ): FindOptionsRelations<T> | undefined {
    if (!includes || includes.length === 0) {
      return undefined;
    }

    let relations: Record<string, boolean> = {};
    for (const include of includes) {
      relations[include] = true;
    }
    return relations as FindOptionsRelations<T>;
  }

  private buildPaginationsOptions(
    query: Query,
  ): { skip: number; take: number } | undefined {
    if (query.unPaginated) {
      return undefined;
    }

    const skip = (query.page - 1) * query.pageSize;
    const take = query.pageSize;
    return { skip, take };
  }

  private buildGenericClause<T>(
    query: Partial<Query> | undefined,
    fieldQuery: T,
  ): T | undefined {
    if (!query) {
      return undefined;
    }
    for (const [key, value] of Object.entries(query)) {
      fieldQuery[key] = value;
    }
    return fieldQuery;
  }

  private mergeSearchAndFilterFindOptionsFromWhereMembers(
    filter: FindOptionsWhere<T> | undefined,
    search: FindOptionsWhere<T> | undefined,
  ): FindOptionsWhere<T> {
    return {
      ...filter,
      ...search,
    } as FindOptionsWhere<T>;
  }
}
