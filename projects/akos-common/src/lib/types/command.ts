export interface Command {
  id: number;
  type: string;
  name?: string;
  parameters?: {[parameter: string]: any}
}
