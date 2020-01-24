export interface Command {
  id: number;
  type: string;
  comment?: string;
  parameters?: {
    waitForPlayer?: boolean;
    picture?: string;
    fullscreen?: boolean;
    text?: string;
  }
}
