import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Node } from '../../../core/types/node';
import { select, Store } from '@ngrx/store';
import { UiActions } from '../../../core/store/actions/ui.actions';
import { ApplicationState } from '../../../core/types/application-state';
import { getExpandedNodes, getNodeStructure } from '../../../core/store/selectors/ui.selectors';

@Component({
  selector: 'project-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  treeControl: NestedTreeControl<Node>;
  dataSource: MatTreeNestedDataSource<Node>;

  constructor(
    private store: Store<ApplicationState>
  ) {
    this.treeControl = new NestedTreeControl<Node>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<Node>();
  }

  ngOnInit() {
    this.store.pipe(select(getNodeStructure)).subscribe(nodes => this.updateStructure(nodes));
    this.store.pipe(select(getExpandedNodes)).subscribe(nodes => this.expandNodes(nodes));
  }

  isParent(index: number, node: Node) {
    return !!node.children;
  }

  isExpanded(node: Node) {
    return this.treeControl.isExpanded(node);
  }

  onSelect(node: Node) {
    this.store.dispatch(UiActions.nodeSelected({id: node.id}));
  }

  onCreate(node: Node) {
    this.store.dispatch(node.getCreateAction());
  }

  onCopy(node: Node) {
    this.store.dispatch(node.getCopyAction());
  }

  onDelete(node: Node) {
    this.store.dispatch(node.getDeleteAction());
  }

  onToggleExpand(node: Node) {
    this.store.dispatch(UiActions.toggleNodeExpanded({id: node.id}));
  }

  private updateStructure(nodes: Node[]): void {
    this.dataSource.data = null;
    this.dataSource.data = nodes;
  }

  private expandNodes(nodes: Node[]): void {
    this.treeControl.collapseAll();
    nodes.forEach(node => this.treeControl.expand(node));
  }
}
