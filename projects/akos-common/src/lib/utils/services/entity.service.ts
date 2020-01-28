import { StatefulService } from 'akos-common/utils/services/stateful.service';

interface EntityState<T> {
  entities: {[id: string]: T};
  order: (string | number)[]
}

export abstract class EntityService<T> extends StatefulService<EntityState<T>> {

  protected idProperty = 'id';

  protected getInitialState(): EntityState<T> {
    return {
      entities: {},
      order: []
    }
  }

  protected abstract getNewEntity(): T;

  createEntity(): string | number {

    let entity = this.getNewEntity();
    let state = this.getState();
    let id = entity[this.idProperty];

    state.entities[id] = entity;
    state.order.push(id);

    this.setState(state);

    return id
  }

  updateEntity(entity: T) {
    let state = this.getState();
    state.entities[entity[this.idProperty]] = entity;
    this.setState(state);
  }

  deleteEntity(entityId: string | number) {

    let state = this.getState();

    delete state.entities[entityId];
    state.order.splice(state.order.indexOf(entityId), 1);

    this.setState(state);
  }

  resetEntities(entities?: T[]) {

    if (!entities) {
      this.resetState();
      return;
    }

    let state = this.getInitialState();
    entities.forEach(entity => {
      let id = entity[this.idProperty];
      state.entities[id] = entity;
      state.order.push(id);
    });

    this.setState(state);
  }

  getEntity(entityId: string | number): T {
    return this.getState().entities[entityId];
  }

  getEntities(): T[] {
    let state = this.getState();
    return state.order.map(id => state.entities[id]);
  }

  observeEntities(observer: (entities: T[]) => void) {
    this.state$.subscribe(() => observer(this.getEntities()));
    observer(this.getEntities());
  }
}
