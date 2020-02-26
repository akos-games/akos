import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'ak-welcome',
  templateUrl: './welcome.view.html',
  styleUrls: ['./welcome.view.scss']
})
export class WelcomeView implements OnInit {

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
