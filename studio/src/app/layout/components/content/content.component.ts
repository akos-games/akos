import {Component, OnInit} from '@angular/core';
import {Node} from '../../../core/types/node';
import {select, Store} from '@ngrx/store';
import {Ui} from '../../../core/types/ui';
import * as UiActions from '../../../core/store/actions/ui.actions';
import {getAllOpenNodes, getSelectedNode} from '../../../core/store/selectors/ui.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'project-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  openNodes: Node[] = [];
  activeNode: Node;

  constructor(private router: Router, private uiStore: Store<{ui: Ui}>) {
  }

  ngOnInit() {
    this.uiStore.pipe(select(getAllOpenNodes)).subscribe(openNodes => this.openNodes = openNodes);
    this.uiStore.pipe(select(getSelectedNode)).subscribe(selectedNode => {
      this.activeNode = selectedNode;
      if (selectedNode) {
        this.router.navigateByUrl(selectedNode.route);
      }
    });
  }

  onSelect(index: number) {
    this.uiStore.dispatch(UiActions.selectNode({id: this.openNodes[index].id}))
  }

  onClose(node: Node): void {
    this.uiStore.dispatch(UiActions.closeNode({id: node.id}));
  }
}
