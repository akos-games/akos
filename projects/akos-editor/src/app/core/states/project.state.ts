import { State } from 'akos-common';
import { Project } from '../types/project';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectState extends State<Project> {

  setBuilding(building: boolean) {
    this.set({...this.subject$.value, building})
  }

  setSaved(saved: boolean) {
    this.set({...this.subject$.value, saved})
  }
}
