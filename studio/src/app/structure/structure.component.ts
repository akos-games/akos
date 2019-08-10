import {Component, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger, MatTreeNestedDataSource} from '@angular/material';

interface StructureNode {
  name: string;
  icon?: string;
  addAction?: boolean;
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

  private structure: StructureNode[] = [{
    name: 'Game metadata',
    icon: 'list_alt'
  }, {
    name: 'Scenes',
    addAction: true,
    children: [{
      name: 'Scene 1',
      icon: 'movie_creation',
      copyAction: true,
      deleteAction: true
    }, {
      name: 'Scene 2',
      icon: 'movie_creation',
      copyAction: true,
      deleteAction: true
    }]
  }];

  private treeControl: NestedTreeControl<StructureNode> = new NestedTreeControl<StructureNode>(
    node => node.children
  );

  private dataSource: MatTreeNestedDataSource<StructureNode> = new MatTreeNestedDataSource<StructureNode>();

  @ViewChild(MatMenuTrigger, {static: false})
  private contextMenu: MatMenuTrigger;

  private contextMenuPosition = {x: '0px', y: '0px'};

  constructor() {
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

  isCategory(index: number, node: StructureNode): boolean {
    return !!node.children;
  }
}
