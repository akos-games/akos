import { Component, OnInit } from '@angular/core';
import { ProjectState } from './core/states/project.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSidebar: boolean;

  constructor(private projectState: ProjectState) {
  }

  ngOnInit() {
    this.projectState.getObservable().subscribe(project => this.showSidebar = !!project);
  }
}
