export interface CommandType {
  type: string;
  icon: string;
  text: string;
  header: 'green' | 'blue' | 'yellow' | 'red';
  parameters?: string[];
  defaults?: any
}

export class Constants {

  static readonly commandTypes: CommandType[] = [{
    type: 'displayText',
    icon: 'text-box',
    text: 'Display text',
    header: 'green',
    parameters: ['waitForPlayer', 'text'],
    defaults: {
      waitForPlayer: true,
      text: ''
    }
  }, {
    type: 'hideText',
    icon: 'text-box-remove',
    text: 'Hide text',
    header: 'green',
    parameters: ['waitForPlayer'],
    defaults: {
      waitForPlayer: false
    }
  }, {
    type: 'displayPicture',
    icon: 'image',
    text: 'Display picture',
    header: 'green',
    parameters: ['waitForPlayer', 'picture', 'fullscreen'],
    defaults: {
      waitForPlayer: false,
      picture: null,
      fullscreen: true
    }
  }, {
    type: 'playerChoice',
    icon: 'arrow-decision',
    text: 'Player choice',
    header: 'yellow',
    parameters: ['choices'],
    defaults: {
      choices: []
    }
  }, {
    type: 'jumpToCommand',
    icon: 'debug-step-over',
    text: 'Jump to command',
    header: 'yellow',
    parameters: ['toCommand'],
    defaults: {
      toCommand: null
    }
  }, {
    type: 'startScene',
    icon: 'movie-open',
    text: 'Start scene',
    header: 'red',
    parameters: ['sceneId'],
    defaults: {
      sceneId: null
    }
  }];
}
