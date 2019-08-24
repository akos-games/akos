import {EventEmitter, Injectable} from '@angular/core';
import {GameDescriptor} from '../models/game-descriptor';
import {GameDescriptorNode} from '../models/game-descriptor-node';
import {Scene} from '../models/scene';
import {FileService} from './file.service';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService {

  private gameDescriptor: GameDescriptor;
  private gameDescriptorLoaded$: EventEmitter<GameDescriptor>;

  constructor(private fileService: FileService) {
    this.gameDescriptorLoaded$ = new EventEmitter<GameDescriptor>();
  }

  public subscribeGameDescriptorLoaded(handler: any): void {
    this.gameDescriptorLoaded$.subscribe(handler);
  }

  public createGameDescriptor(): void {

    this.gameDescriptor = {
      uidSequence: 0,
      gameMetadata: {
        uid: ''
      },
      scenes: {}
    };

    this.gameDescriptor.gameMetadata.uid = this.generateUid();

    this.gameDescriptorLoaded$.emit(this.gameDescriptor);
  }

  public async saveGameDescriptor(projectFolder: string): Promise<void> {
    return this.fileService.writeFile('game-descriptor.akg', projectFolder, JSON.stringify(this.gameDescriptor));
  }

  public createScene(): Scene {

    let scene: Scene = this.createNode();
    scene.name = 'New scene';
    this.gameDescriptor.scenes[scene.uid] = scene;

    return scene;
  }

  public copyScene(uid: string): Scene {

    let scene: Scene = this.copyNode(this.gameDescriptor.scenes[uid]);
    scene.name = scene.name + ' copy';
    this.gameDescriptor.scenes[scene.uid] = scene;

    return scene;
  }

  public deleteScene(uid: string): void {
    delete this.gameDescriptor.scenes[uid];
  }

  private generateUid(): string {

    let uid = 'n' + this.gameDescriptor.uidSequence;
    this.gameDescriptor.uidSequence++;

    return uid;
  }

  private createNode(): GameDescriptorNode {
    return {uid: this.generateUid()};
  }

  private copyNode(node: GameDescriptorNode): GameDescriptorNode {

    let copy = JSON.parse(JSON.stringify(node));
    copy.uid = this.generateUid();

    return copy;
  }
}
