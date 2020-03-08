import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './core/services/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationService.start();
  }
}
