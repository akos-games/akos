import {EventEmitter, Injectable} from '@angular/core';
import {ProjectNode} from '../models/project-node';
import {GameDescriptorService} from './game-descriptor.service';
import {GameDescriptor} from '../models/game-descriptor';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectStructure: ProjectNode[];
  public projectStructureUpdated: EventEmitter<ProjectNode[]>;

  constructor(private gameDescriptorService: GameDescriptorService) {
    this.projectStructureUpdated = new EventEmitter<ProjectNode[]>();
    this.gameDescriptorService.gameDescriptorLoaded.subscribe(gameDescriptor => this.onGameDescriptorLoaded(gameDescriptor));
  }

  public executeNodeAction(node: ProjectNode, action: string): void {
    this[action](node);
  }

  private onGameDescriptorLoaded(gameDescriptor: GameDescriptor): void {

    this.projectStructure = [];
    this.projectStructure.push({
      uid: gameDescriptor.gameMetadata.uid,
      name: 'Game metadata',
      icon: 'list_alt'
    }, {
      name: 'Scenes',
      addAction: 'addScene',
      children: []
    });

    this.projectStructureUpdated.emit(this.projectStructure);
  }

  private addScene(scenes: ProjectNode): void {

    scenes.children.push({
      uid: this.gameDescriptorService.addScene(),
      name: 'New scene',
      icon: 'movie_creation',
      deleteAction: 'deleteScene',
      copyAction: 'copyScene'
    });

    this.projectStructureUpdated.emit(this.projectStructure);
  }
}
