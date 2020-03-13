import { State } from './state';
import { BehaviorSubject } from 'rxjs';
import { deepCopy } from '../object';

interface EntityCache<T> {
  entities: {[id: number]: T};
  order: Set<number>;
}

export class CollectionState<T> extends State<T[]> {

  protected idProperty = 'id';
  private cache = this.getEmptyCache();

  constructor() {
    super();
    this.subject = new BehaviorSubject<T[]>([]);
  }

  set(entities: T[]) {
    this.cache = this.getEmptyCache();
    this.add(entities);
  }

  add(entity: T);
  add(entities: T[]);
  add(entities) {

    let entityArray = deepCopy(Array.isArray(entities) ? entities : [entities]);
    entityArray.forEach(entity => {
      let id = entity[this.idProperty];
      this.cache.entities[id] = entity;
      this.cache.order.add(id);
    });

    // Avoid building state in case of first cache addition
    super.set(this.cache.order.size === entityArray.length ? entityArray : this.buildState());
  }

  remove(entityOrId: T | number): T;
  remove(entitiesOrIds: (T | number)[]): T[];
  remove(entitiesOrIds): T | T[] {

    let entityArray = Array.isArray(entitiesOrIds) ? entitiesOrIds : [entitiesOrIds];
    let deleted = [];
    entityArray.forEach(entityOrId => {
      let id = typeof entityOrId === 'object' ? entityOrId[this.idProperty] : entityOrId;
      deleted.push(this.cache.entities[id]);
      delete this.cache.entities[id];
      this.cache.order.delete(id);
    });

    super.set(this.buildState());

    return Array.isArray(entitiesOrIds) ? deleted : deleted[0];
  }

  getById(entityId: number): T {
    return deepCopy(this.cache.entities[entityId]);
  }

  private buildState(): T[] {
    return [...this.cache.order].map(id => this.cache.entities[id]);
  }

  private getEmptyCache(): EntityCache<T> {
    return {
      entities: {},
      order: new Set<number>()
    };
  }
}
