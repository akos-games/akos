export interface Command {
  id: number;
  type: 'displayPicture'
    | 'displayText'
    | 'hideText'
    | 'startScene'
    | 'jumpToCommand'
    | 'playerChoice';
  displayedSections?: ('body' | 'condition')[]
  condition: any;
  reference?: number;
  parameters?: {

    // Commons
    waitForPlayer?: boolean;

    // displayPicture
    picture?: string;
    fullscreen?: boolean;

    // displayText
    text?: string;

    // startScene
    sceneId?: number;

    // jumpToCommand
    toCommand?: number;

    // playerChoice
    choices?: {toCommand: number; text: string;}[]
  }
}
