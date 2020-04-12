import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'page-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onCreate() {
    this.projectService.saveProject();
  }

  onOpen() {
    this.projectService.loadProject();
  }
}
