import { Component, OnInit } from '@angular/core';
import { ProjectState } from './core/states/project.state';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSidebar: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private projectState: ProjectState
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.projectState.observe().subscribe(project => this.showSidebar = !!project);
  }
}
