import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../types/nodes/tree.node';
import { GameNode } from '../../types/nodes/game.node';
import { ScenesNode } from '../../types/nodes/scenes.node';
import { SceneNode } from '../../types/nodes/scene.node';
import { Router } from '@angular/router';
import { ScenesService } from '../../../core/services/scenes.service';
import { Scene } from 'akos-common';
import { ScenesState } from '../../../core/states/scenes.state';
import { ThemeNode } from '../../types/nodes/theme.node';

@Component({
  selector: 'ak-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  treeControl: NestedTreeControl<TreeNode>;
  dataSource: MatTreeNestedDataSource<TreeNode>;

  private readonly game: GameNode;
  private readonly theme: ThemeNode;
  private readonly scenes: ScenesNode;

  constructor(
    private router: Router,
    private sceneService: ScenesService,
    private scenesState: ScenesState
  ) {

    this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();

    this.game = new GameNode();
    this.theme = new ThemeNode();
    this.scenes = new ScenesNode(this.sceneService);
  }

  ngOnInit() {

    this.dataSource.data = [
      this.game,
      this.theme,
      this.scenes
    ];

    this.scenesState.getObservable().subscribe(scenes => this.updateScenes(scenes));
  }

  isParent(index: number, node: TreeNode) {
    return !!node.children;
  }

  isExpanded(node: TreeNode) {
    return this.treeControl.isExpanded(node);
  }

  onCreate(node: TreeNode) {

    let childRoute = node.createChild();
    this.router.navigateByUrl(childRoute);

    if (!this.isExpanded(node)) {
      this.treeControl.expand(node);
    }
  }

  onToggleExpand(node: TreeNode) {
    this.treeControl.toggle(node);
  }

  private updateTree() {

    let data = this.dataSource.data;

    this.dataSource.data = null;
    this.dataSource.data = data;

    this.checkCurrentRoute();
  }

  private checkCurrentRoute() {

    let displayedNodeStillExists = this.dataSource.data.some(node =>
      this.router.url === node.route || node.children?.some(child => this.router.url === child.route)
    );

    if (!displayedNodeStillExists) {
      this.router.navigateByUrl('');
    }
  }

  private updateScenes(scenes: Scene[]) {

    this.scenes.children = scenes.map(scene => new SceneNode(scene.id, scene.name));
    this.updateTree();

    if (scenes.length === 0) {
      this.treeControl.collapse(this.scenes);
    }
  }
}
