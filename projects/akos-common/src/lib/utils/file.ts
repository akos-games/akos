export function getDirectory(file: string): string {
  return file.substring(0, file.lastIndexOf('/'));
}
