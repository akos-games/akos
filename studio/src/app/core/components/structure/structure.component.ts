import {Component, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger, MatTreeNestedDataSource} from '@angular/material';
import {ProjectNode} from '../../models/project-node';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  private treeControl: NestedTreeControl<ProjectNode>;
  private dataSource: MatTreeNestedDataSource<ProjectNode>;

  @ViewChild(MatMenuTrigger, {static: false})
  private contextMenu: MatMenuTrigger;
  private contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private projectService: ProjectService) {

    this.treeControl = new NestedTreeControl<ProjectNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<ProjectNode>();

    projectService.projectStructureUpdated.subscribe(projectStructure => this.onProjectStructureUpdated(projectStructure));
  }

  ngOnInit() {
  }

  isCategory(index: number, node: ProjectNode): boolean {
    return !!node.children;
  }

  onContextMenu(event: MouseEvent, node: ProjectNode): void {

    event.preventDefault();

    if (node.copyAction || node.deleteAction) {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = {node};
      this.contextMenu.openMenu();
    }
  }

  onAdd(node: ProjectNode): void {
    this.treeControl.expand(node);
    this.projectService.executeNodeAction(node, node.addAction);
  }

  private onProjectStructureUpdated(projectStructure: ProjectNode[]): void {
    this.dataSource.data = null;
    this.dataSource.data = projectStructure;
  }
}
