import sanitize from 'sanitize-filename';

export function sanitizeGameName(name: string): string {
  return sanitize(name.replace(/ /gi, ''));
}
