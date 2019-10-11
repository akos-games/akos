import * as _ from 'lodash';

export function deepCopy(object) {
  return _.cloneDeep(object);
}
