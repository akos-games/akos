import {Component, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger, MatTreeNestedDataSource} from '@angular/material';
import {ProjectNode} from '../../core/types/project-node';

@Component({
  selector: 'project-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  treeControl: NestedTreeControl<ProjectNode>;
  dataSource: MatTreeNestedDataSource<ProjectNode>;

  @ViewChild(MatMenuTrigger, {static: false})
  private contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor() {

    this.treeControl = new NestedTreeControl<ProjectNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<ProjectNode>();

    // uiService.subscribeProjectStructureUpdated(projectStructure => this.onProjectStructureUpdated(projectStructure));
  }

  ngOnInit() {
  }

  isCategory(index: number, node: ProjectNode): boolean {
    return !!node.children;
  }

  onClick(node: ProjectNode): void {
    // this.uiService.openNode(node);
  }

  onContextMenu(event: MouseEvent, node: ProjectNode): void {

    event.preventDefault();

    if (node.copyHandler || node.deleteHandler) {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = {node};
      this.contextMenu.openMenu();
    }
  }

  onCreate(node: ProjectNode): void {
    this.treeControl.expand(node);
    // this.uiService.executeNodeHandler(node.createHandler, node);
  }

  onCopy(node: ProjectNode): void {
    // this.uiService.executeNodeHandler(node.copyHandler, node);
  }

  onDelete(node: ProjectNode): void {
    // this.uiService.executeNodeHandler(node.deleteHandler, node);
  }

  private onProjectStructureUpdated(projectStructure: ProjectNode[]): void {
    this.dataSource.data = null;
    this.dataSource.data = projectStructure;
  }
}
