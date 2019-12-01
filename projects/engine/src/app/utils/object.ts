export function deepCopy(object) {
  return object ? JSON.parse(JSON.stringify(object)) : null;
}
