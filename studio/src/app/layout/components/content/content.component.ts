import {Component, OnInit} from '@angular/core';
import {Node} from '../../types/node';

@Component({
  selector: 'project-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  openNodes: Node[];
  activeNode: Node;

  constructor() {
    // uiService.subscribeNodeOpen(node => this.onNodeOpen(node));
    // uiService.subscribeNodeDeleted(node => this.onNodeDeleted(node));
    // gameDescriptorService.subscribeGameDescriptorLoaded(() => this.closeAll());
  }

  ngOnInit() {
    this.openNodes = [];
  }

  onClose(node: Node): void {

    let nodeIndex = this.openNodes.indexOf(node);
    this.openNodes.splice(nodeIndex, 1);

    if (this.activeNode === node) {
      let activeIndex = nodeIndex < this.openNodes.length ? nodeIndex : this.openNodes.length - 1;
      this.activeNode = this.openNodes[activeIndex];
    }
  }

  private onNodeOpen(node: Node): void {

    if (this.openNodes.indexOf(node) < 0) {
      this.openNodes.push(node);
    }

    this.activeNode = node;
  }

  private onNodeDeleted(node: Node): void {
    this.onClose(node);
  }

  private closeAll(): void {
    this.openNodes = [];
    this.activeNode = null;
  }
}
