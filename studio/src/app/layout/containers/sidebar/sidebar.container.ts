import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { TreeNode } from '../../types/tree-node';
import { SceneStore } from '../../../core/stores/scene.store';
import { Scene } from '../../../core/types/scene';
import { MetadataNode } from '../../types/metadata-node';
import { ScenesNode } from '../../types/scenes-node';
import { SceneService } from '../../../core/services/scene.service';
import { SceneNode } from '../../types/scene-node';

@Component({
  selector: 'ak-sidebar',
  templateUrl: './sidebar.container.html',
  styleUrls: ['./sidebar.container.css']
})
export class SidebarContainer implements OnInit {

  treeControl: NestedTreeControl<TreeNode>;
  dataSource: MatTreeNestedDataSource<TreeNode>;

  private readonly metadata: MetadataNode;
  private readonly scenes: ScenesNode;

  constructor(private sceneStore: SceneStore, private sceneService: SceneService) {

    this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();

    this.metadata = new MetadataNode();
    this.scenes = new ScenesNode(this.sceneService);
  }

  ngOnInit() {

    this.dataSource.data = [
      this.metadata,
      this.scenes
    ];

    this.sceneStore.items$.subscribe(scenes => this.updateScenes(scenes));
  }

  isParent(index: number, node: TreeNode) {
    return !!node.children;
  }

  isExpanded(node: TreeNode) {
    return this.treeControl.isExpanded(node);
  }

  onCreate(node: TreeNode) {

    node.createChild();

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
  }

  private expandNodes(nodes: TreeNode[]) {
    this.treeControl.collapseAll();
    nodes.forEach(node => this.treeControl.expand(node));
  }

  private updateScenes(scenes: Scene[]) {
    this.scenes.children = scenes.map(scene => new SceneNode(scene.id, scene.name, this.sceneService));
    this.updateTree();
  }
}
