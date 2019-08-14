import {Component, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger, MatTreeNestedDataSource} from '@angular/material';
import {GameDescriptorService} from '../../services/game-descriptor.service';
import {GameDescriptor} from '../../models/game-descriptor';

interface StructureNode {
  uid?: number;
  name: string;
  icon?: string;
  addAction?: boolean;
  addHander?: string;
  deleteAction?: boolean;
  copyAction?: boolean;
  children?: StructureNode[];
}

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  private structure: StructureNode[] = [];

  private treeControl: NestedTreeControl<StructureNode> = new NestedTreeControl<StructureNode>(
    node => node.children
  );

  private dataSource: MatTreeNestedDataSource<StructureNode> = new MatTreeNestedDataSource<StructureNode>();

  @ViewChild(MatMenuTrigger, {static: false})
  private contextMenu: MatMenuTrigger;

  private contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private gameDescriptorService: GameDescriptorService) {
    this.buildStructure();
    this.dataSource.data = this.structure;
  }

  ngOnInit() {
  }

  onContextMenu(event: MouseEvent, node: StructureNode): void {

    event.preventDefault();

    if (node.copyAction || node.deleteAction) {

      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = {node};
      this.contextMenu.openMenu();
    }
  }

  onAdd(node: StructureNode): void {
    this.treeControl.expand(node);
    this[node.addHander](node);
    this.refreshTree();
  }

  isCategory(index: number, node: StructureNode): boolean {
    return !!node.children;
  }

  private buildStructure(): void {

    let gameDescriptor: GameDescriptor = this.gameDescriptorService.getGameDescriptor();

    this.structure.push({
      uid: gameDescriptor.gameMetadata.uid,
      name: 'Game metadata',
      icon: 'list_alt'
    }, {
      name: 'Scenes',
      addAction: true,
      addHander: 'addScene',
      children: []
    });
  }

  private refreshTree(): void {
    this.dataSource.data = null;
    this.dataSource.data = this.structure;
  }

  private addScene(scenes: StructureNode): void {

    scenes.children.push({
      uid: this.gameDescriptorService.addScene(),
      name: 'New scene',
      icon: 'movie_creation',
      copyAction: true,
      deleteAction: true
    });
  }
}
