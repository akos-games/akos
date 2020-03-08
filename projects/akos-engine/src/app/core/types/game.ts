export interface Game {
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
    }
  }
}
