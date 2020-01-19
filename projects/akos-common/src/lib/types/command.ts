export interface Command {
  id: number;
  type: string;
  comment?: string;
  parameters?: {
    waitForPlayer?: boolean;
    picture?: string;
    text?: string;
  }
}
