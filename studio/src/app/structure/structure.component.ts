import { Component, OnInit } from '@angular/core';
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material";

interface StructureNode {
  name: string;
  icon?: string;
  addButton?: boolean;
  removeButton?: boolean;
  editButton?: boolean;
  children?: StructureNode[];
}

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  private structure: StructureNode[] = [{
    name: 'Game metadata',
    icon: 'list_alt'
  }, {
    name: 'Scenes',
    addButton: true,
    children: [{
      name: 'Scene 1',
      icon: 'movie_creation',
      editButton: true,
      removeButton: true
    }, {
      name: 'Scene 2',
      icon: 'movie_creation',
      editButton: true,
      removeButton: true
    }]
  }];

  private treeControl: NestedTreeControl<StructureNode> = new NestedTreeControl<StructureNode>(
    node => node.children
  );

  private dataSource: MatTreeNestedDataSource<StructureNode> = new MatTreeNestedDataSource<StructureNode>();

  constructor() {
    this.dataSource.data = this.structure;
  }

  ngOnInit() {
  }

  isCategory(index: number, node: StructureNode): boolean {
    return !!node.children;
  }
}
