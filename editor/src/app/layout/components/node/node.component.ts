import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { TreeNode } from '../../types/tree-node';

@Component({
  selector: 'ak-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: TreeNode;
  @Input() expanded: boolean;

  @Output() create = new EventEmitter<TreeNode>();
  @Output() toggleExpand = new EventEmitter<TreeNode>();

  constructor() {
  }

  ngOnInit() {
  }

  isParent() {
    return !!this.node.children;
  }

  isExpandable() {
    return this.node.children.length > 0;
  }

  onCreate() {
    this.create.emit(this.node);
  }

  onToggleExpand() {
    if (this.isExpandable()) {
      this.toggleExpand.emit(this.node);
    }
  }
}
