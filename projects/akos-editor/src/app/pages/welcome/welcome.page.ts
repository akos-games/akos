import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import packageInfo from  '../../../../../../package.json';

@Component({
  selector: 'page-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss']
})
export class WelcomePage implements OnInit {

  akosVersion = packageInfo.version;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onOpen() {
    this.projectService.loadProject();
  }
}
