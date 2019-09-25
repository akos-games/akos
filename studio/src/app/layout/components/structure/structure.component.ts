import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Node} from '../../types/node';
import {Project} from '../../../core/types/project';
import {select, Store} from '@ngrx/store';
import {Ui} from '../../../core/types/ui';
import {openNode} from '../../../core/store/actions/ui.actions';
import {getMetadata} from '../../../core/store/selectors/project.selectors';
import {merge, Observable} from 'rxjs';
import {Metadata} from '../../../core/types/metadata';
import {NodeHelper} from '../../helpers/node.helper';

@Component({
  selector: 'project-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  treeControl: NestedTreeControl<Node>;
  dataSource: MatTreeNestedDataSource<Node>;

  private metadata: Observable<Metadata> = new Observable<Metadata>();

  constructor(private projectStore: Store<{project: Project}>, private uiStore: Store<{ui: Ui}>) {
    this.treeControl = new NestedTreeControl<Node>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<Node>();
  }

  ngOnInit() {
    this.metadata = this.projectStore.pipe(select(getMetadata));
    merge(this.metadata).subscribe(() => this.updateStructure());
  }

  isParent(index: number, node: Node): boolean {
    return !!node.children;
  }

  onSelect(node: Node): void {
    this.uiStore.dispatch(openNode());
  }

  onCreate(node: Node): void {
    this.treeControl.expand(node);
    this.projectStore.dispatch(node.createAction);
  }

  onCopy(node: Node): void {
    this.projectStore.dispatch(node.copyAction);
  }

  onDelete(node: Node): void {
    this.projectStore.dispatch(node.deleteAction);
  }

  private updateStructure(): void {

    let structure: Node[] = [];

    structure.push(NodeHelper.getMetadataNode());

    this.dataSource.data = null;
    this.dataSource.data = structure;
  }
}
