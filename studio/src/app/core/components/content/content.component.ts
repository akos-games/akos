import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectNode} from '../../models/project-node';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  private openNodes: ProjectNode[];
  private activeNode: ProjectNode;

  constructor(private projectService: ProjectService) {
    projectService.subscribeNodeOpen(node => this.onNodeOpen(node));
  }

  ngOnInit() {
    this.openNodes = [];
  }

  onClose(node: ProjectNode): void {

    let nodeIndex = this.openNodes.indexOf(node);
    this.openNodes.splice(nodeIndex, 1);

    if (this.activeNode === node) {
      let activeIndex = nodeIndex < this.openNodes.length ? nodeIndex : this.openNodes.length - 1;
      this.activeNode = this.openNodes[activeIndex];
    }
  }

  private onNodeOpen(node: ProjectNode): void {

    if (this.openNodes.indexOf(node) < 0) {
      this.openNodes.push(node);
    }

    this.activeNode = node;
  }
}
