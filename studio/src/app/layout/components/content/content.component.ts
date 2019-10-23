import { Component, OnInit } from '@angular/core';
import { Node } from '../../../core/types/node';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UiActions } from '../../../core/store/actions/ui.actions';
import { getActiveTab, getOpenTabs } from '../../../core/store/selectors/ui.selectors';
import { ApplicationState } from '../../../core/types/application-state';

@Component({
  selector: 'project-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  openTabs: Node[] = [];
  activeTab: Node;

  constructor(private router: Router, private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.pipe(select(getOpenTabs)).subscribe(openTabs => {this.openTabs = openTabs});
    this.store.pipe(select(getActiveTab)).subscribe(activeTab => {

      if (activeTab && activeTab.id !== (this.activeTab && this.activeTab.id)) {
        this.activeTab = activeTab;
      }
    });
  }

  onSelect(index: number) {

    let selectedTab = this.openTabs[index];

    if (index !== -1 && selectedTab.id !== this.activeTab.id) {
      this.store.dispatch(UiActions.activateTab({id: selectedTab.id}));
    }
  }

  onClose(node: Node): void {
    this.store.dispatch(UiActions.closeTab({id: node.id}));
  }

  getSelectedIndex() {
    return this.openTabs.findIndex(tab => tab.id === this.activeTab.id);
  }
}
