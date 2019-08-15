import {EventEmitter, Injectable} from '@angular/core';
import {GameDescriptor} from '../models/game-descriptor';
import {GameDescriptorNode} from '../models/game-descriptor-node';
import {Scene} from '../models/scene';

@Injectable({
  providedIn: 'root'
})
export class GameDescriptorService {

  private gameDescriptor: GameDescriptor;
  private readonly index: {[uid: string]: GameDescriptorNode};

  public gameDescriptorLoaded: EventEmitter<GameDescriptor>;

  constructor() {
    this.index = {};
    this.gameDescriptorLoaded = new EventEmitter<GameDescriptor>();
  }

  public createGameDescriptor(): void {

    this.gameDescriptor = new GameDescriptor();
    this.gameDescriptor.gameMetadata = {
      uid: this.generateUid()
    };

    this.indexAll();
    this.gameDescriptorLoaded.emit(this.gameDescriptor);
  }

  public addScene(): number {

    let scene = {
      uid: this.generateUid()
    };

    this.gameDescriptor.scenes.push(scene);
    this.addIndex(scene);

    return scene.uid;
  }

  public removeScene(scene: Scene): void {
    this.removeIndex(scene.uid);
    this.gameDescriptor.scenes.splice(this.gameDescriptor.scenes.indexOf(scene), 1);
  }

  private generateUid(): number {

    let uid = this.gameDescriptor.uidSequence;
    this.gameDescriptor.uidSequence++;

    return uid;
  }

  private addIndex(node: GameDescriptorNode): void {
    this.index['n' + node.uid] = node;
  }

  private removeIndex(uid: number): void {
    delete this.index['n' + uid];
  }

  private indexAll(): void {
    this.addIndex(this.gameDescriptor.gameMetadata);
    this.gameDescriptor.scenes.forEach(this.addIndex);
  }
}
