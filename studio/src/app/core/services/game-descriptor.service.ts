import {EventEmitter, Injectable} from '@angular/core';
import {GameDescriptor} from '../models/game-descriptor';
import {GameDescriptorNode} from '../models/game-descriptor-node';
import {Scene} from '../models/scene';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService {

  private gameDescriptor: GameDescriptor;
  private uidSequence: number;

  private gameDescriptorLoaded$: EventEmitter<GameDescriptor>;

  constructor() {
    this.gameDescriptorLoaded$ = new EventEmitter<GameDescriptor>();
  }

  public subscribeGameDescriptorLoaded(handler: any): void {
    this.gameDescriptorLoaded$.subscribe(handler);
  }

  public createGameDescriptor(): void {

    this.uidSequence = 0;
    this.gameDescriptor = {
      metadata: {
        uid: this.generateUid()
      },
      scenes: {}
    };

    this.gameDescriptorLoaded$.emit(this.gameDescriptor);
  }

  public loadGameDescriptor(gameDescriptor: GameDescriptor, uidSequence: number): void {

    this.gameDescriptor = gameDescriptor;
    this.uidSequence = uidSequence;

    this.gameDescriptorLoaded$.emit(this.gameDescriptor);
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

  private createNode(): GameDescriptorNode {
    return {uid: this.generateUid()};
  }

  private copyNode(node: GameDescriptorNode): GameDescriptorNode {

    let copy = JSON.parse(JSON.stringify(node));
    copy.uid = this.generateUid();

    return copy;
  }

  private generateUid(): string {

    let uid = 'n' + this.uidSequence;
    this.uidSequence++;

    return uid;
  }

  public getGameDescriptor(): GameDescriptor {
    return this.gameDescriptor;
  }

  public getUidSequence(): number {
    return this.uidSequence;
  }
}
