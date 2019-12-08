import { Component, OnInit } from '@angular/core';
import { ProjectStore } from './stores/project.store';
import { Router } from '@angular/router';
import { Project } from './types/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSidebar: boolean;

  constructor(private router: Router, private projectStore: ProjectStore) {
  }

  ngOnInit() {
    this.projectStore.state$.subscribe(async project => this.showSidebar = project);
  }
}
