import { Component, OnInit } from '@angular/core';
import { ProjectService } from './core/services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSidebar: boolean;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getObservable().subscribe(project => this.showSidebar = !!project);
  }
}
