export interface Game {
  sessionStart: number;
  playTime: number;
  scene: {
    sceneId: number;
    commandIndex: number;
    picture: {
      asset: string;
      fullscreen: boolean;
    },
    text: {
      content: string;
      visible: boolean;
    },
    playerChoices: {
      text: string;
      toCommand: number;
    }[]
  }
}
