export interface Command {
  id: number;
  type: string;
  comment?: string;
  parameters?: {[parameter: string]: any}
}
