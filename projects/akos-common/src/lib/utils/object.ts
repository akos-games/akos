export function deepCopy<T>(value: T): T {
  return typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
}
