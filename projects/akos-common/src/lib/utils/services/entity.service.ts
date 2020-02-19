import { StatefulService } from './stateful.service';
import { deepCopy } from '../object';

interface EntityCache<T> {
  entities: {[id: string]: T};
  order: Set<string | number>;
}

export abstract class EntityService<T> extends StatefulService<T[]> {

  protected idProperty = 'id';
  private cache = this.getEmptyCache();

  protected addToState(entity: T);
  protected addToState(entities: T[]);
  protected addToState(entities) {

    let entityArray = Array.isArray(entities) ? entities : [entities];
    entityArray.forEach(entity => {
      let id = entity[this.idProperty];
      this.cache.entities[id] = entity;
      this.cache.order.add(id);
    });

    // Avoid building state in case of first cache addition
    super.setState(this.cache.order.size === entityArray.length ? entityArray : this.buildState());
  }

  protected removeFromState(entityOrId: T | string | number): T;
  protected removeFromState(entitiesOrIds: (T | string | number)[]): T[];
  protected removeFromState(entitiesOrIds): T | T[] {

    let entityArray = Array.isArray(entitiesOrIds) ? entitiesOrIds : [entitiesOrIds];
    let deleted = [];
    entityArray.forEach(entityOrId => {
      let id = typeof entityOrId === 'object' ? entityOrId[this.idProperty] : entityOrId;
      deleted.push(this.cache.entities[id]);
      delete this.cache.entities[id];
      this.cache.order.delete(id);
    });

    super.setState(this.buildState());

    return Array.isArray(entitiesOrIds) ? deleted : deleted[0];
  }

  protected getFromState(entityId: string | number): T {
    return deepCopy(this.cache.entities[entityId]);
  }

  protected setState(entities: T[]) {
    this.cache = this.getEmptyCache();
    this.addToState(entities);
  }

  protected getInitialState(): T[] {
    return [];
  }

  private buildState(): T[] {
    return [...this.cache.order].map(id => this.cache.entities[id]);
  }

  private getEmptyCache(): EntityCache<T> {
    return {
      entities: {},
      order: new Set<string | number>()
    };
  }
}
