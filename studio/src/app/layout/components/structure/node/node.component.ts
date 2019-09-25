import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Node} from '../../../types/node';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'project-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;
  @Input() expanded: boolean;

  @Output() select = new EventEmitter<Node>();
  @Output() create = new EventEmitter<Node>();
  @Output() copy = new EventEmitter<Node>();
  @Output() delete = new EventEmitter<Node>();

  @ViewChild(MatMenuTrigger, {static: false})
  private contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.select.emit(this.node);
  }

  onCreate() {
    this.create.emit(this.node);
  }

  onCopy() {
    this.copy.emit(this.node);
  }

  onDelete() {
    this.delete.emit(this.node);
  }

  onContextMenu(event: MouseEvent): void {

    event.preventDefault();

    if (this.node.copyAction || this.node.deleteAction) {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = {node: this.node};
      this.contextMenu.openMenu();
    }
  }
}
