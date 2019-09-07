import {EventEmitter, Injectable} from '@angular/core';
import {GameDescriptorService} from './game-descriptor.service';
import {ProjectNode} from '../types/project-node';
import {GameDescriptor} from '../types/game-descriptor';
import {Scene} from '../types/scene';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private projectStructure: ProjectNode[];
  private scenes: ProjectNode;

  private projectStructureUpdated$: EventEmitter<ProjectNode[]>;
  private nodeOpen$: EventEmitter<ProjectNode>;
  private nodeDeleted$: EventEmitter<ProjectNode>;

  constructor(private gameDescriptorService: GameDescriptorService) {

    this.projectStructureUpdated$ = new EventEmitter<ProjectNode[]>();
    this.nodeOpen$ = new EventEmitter<ProjectNode>();
    this.nodeDeleted$ = new EventEmitter<ProjectNode>();

    this.gameDescriptorService.subscribeGameDescriptorLoaded(gameDescriptor => this.onGameDescriptorLoaded(gameDescriptor));
  }

  public subscribeProjectStructureUpdated(handler: any) {
    this.projectStructureUpdated$.subscribe(handler);
  }

  public subscribeNodeOpen(handler: any) {
    this.nodeOpen$.subscribe(handler);
  }

  public subscribeNodeDeleted(handler: any) {
    this.nodeDeleted$.subscribe(handler);
  }

  public openNode(node: ProjectNode): void {
    this.nodeOpen$.emit(node);
  }

  public executeNodeHandler(handler: Function, node?: ProjectNode): void {
    handler.bind(this)(node);
  }

  private onGameDescriptorLoaded(gameDescriptor: GameDescriptor): void {

    let gameMetadata = {
      name: 'Game metadata',
      icon: 'list_alt',
      gameDescriptorNode: gameDescriptor.metadata,
      component: 'game-metadata'
    };

    this.addScenes(gameDescriptor.scenes);

    this.projectStructure = [
      gameMetadata,
      this.scenes
    ];

    this.projectStructureUpdated$.emit(this.projectStructure);
  }

  private addScenes(scenes: { [uid: string]: Scene }): void {

    this.scenes = {
      name: 'Scenes',
      createHandler: this.createScene,
      children: []
    };

    for (let uid in scenes) {
      this.addScene(scenes[uid], true);
    }
  }

  private addScene(scene: Scene, silent?: boolean): void {

    let node = {
      name: scene.name,
      icon: 'movie_creation',
      gameDescriptorNode: scene,
      copyHandler: this.copyScene,
      deleteHandler: this.deleteScene,
      component: 'scene',
      parent: this.scenes
    };

    this.addNode(node, silent);
  }

  private createScene(): void {
    let scene = this.gameDescriptorService.createScene();
    this.addScene(scene);
  }

  private copyScene(scene: ProjectNode): void {
    let copy = this.gameDescriptorService.copyScene(scene.gameDescriptorNode.uid);
    this.addScene(copy);
  }

  private deleteScene(scene: ProjectNode): void {
    this.gameDescriptorService.deleteScene(scene.gameDescriptorNode.uid);
    this.deleteNode(scene);
  }

  private addNode(node: ProjectNode, silent: boolean): void {

    node.parent.children.push(node);

    if (!silent) {
      this.projectStructureUpdated$.emit(this.projectStructure);
      this.openNode(node);
    }
  }

  private deleteNode(node: ProjectNode) {
    node.parent.children.splice(node.parent.children.indexOf(node), 1);
    this.nodeDeleted$.emit(node);
    this.projectStructureUpdated$.emit(this.projectStructure);
  }
}
