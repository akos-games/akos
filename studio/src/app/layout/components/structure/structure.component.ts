import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {Node} from '../../../core/types/node';
import {Project} from '../../../core/types/project';
import {select, Store} from '@ngrx/store';
import {Ui} from '../../../core/types/ui';
import {openNode} from '../../../core/store/actions/ui.actions';
import {getMetadata} from '../../../core/store/selectors/project.selectors';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {Metadata} from '../../../core/types/metadata';
import {NodeHelper} from '../../helpers/node.helper';
import {EntityState} from '@ngrx/entity';
import {Scene} from '../../../core/types/scene';
import {getAllScenes} from '../../../core/store/selectors/scene.selectors';
import * as UiActions from '../../../core/store/actions/ui.actions'

@Component({
  selector: 'project-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  treeControl: NestedTreeControl<Node>;
  dataSource: MatTreeNestedDataSource<Node>;

  private metadata$: Observable<Metadata>;
  private scenes$: BehaviorSubject<Scene[]> = new BehaviorSubject<Scene[]>([]);

  constructor(
    private projectStore: Store<{project: Project}>,
    private uiStore: Store<{ui: Ui}>,
    private scenesStore: Store<{scenes: EntityState<Scene>}>
  ) {
    this.treeControl = new NestedTreeControl<Node>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<Node>();
  }

  ngOnInit() {

    this.initStructure();

    this.metadata$ = this.projectStore.pipe(select(getMetadata));
    this.scenesStore.pipe(select(getAllScenes)).subscribe(this.scenes$);

    merge(this.metadata$, this.scenes$).subscribe(() => this.updateStructure());
  }

  isParent(index: number, node: Node): boolean {
    return !!node.children;
  }

  isExpanded(node: Node): boolean {

    if (node.children.length === 0) {
      this.treeControl.collapse(node);
    }

    return this.treeControl.isExpanded(node);
  }

  onSelect(node: Node): void {
    this.uiStore.dispatch(openNode({node}));
  }

  onCreate(node: Node): void {
    this.projectStore.dispatch(node.getCreateAction());
    this.uiStore.dispatch(UiActions.openNode({node: node.children[node.children.length - 1]}));
    this.treeControl.expand(node);
  }

  onCopy(node: Node): void {
    this.projectStore.dispatch(node.getCopyAction());
  }

  onDelete(node: Node): void {
    this.projectStore.dispatch(node.getDeleteAction());
    this.uiStore.dispatch(UiActions.closeNode({id: node.id}))
  }

  private initStructure(): void {

    let structure: Node[] = [];

    structure.push(NodeHelper.getMetadataNode());
    structure.push(NodeHelper.getScenesParentNode());

    this.dataSource.data = null;
    this.dataSource.data = structure;
  }

  private updateStructure(): void {

    this.dataSource.data[1].children = NodeHelper.getScenesNodes(this.scenes$.getValue());

    let data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
  }
}
