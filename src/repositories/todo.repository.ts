import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations} from '../models';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Todo, dataSource);
  }

  // Add the following function
  public async findByTitle(title: string, id: number): Promise<Todo[]> {
    const titleFilter = {
      where: {
        title,
        and: [{id}],
      },
    };
    const foundTodo = await this.find(titleFilter);
    return foundTodo;
  }
}
