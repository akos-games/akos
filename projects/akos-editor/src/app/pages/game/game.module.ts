import { NgModule } from '@angular/core';
import { GamePage } from './game.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  declarations: [
    GamePage
  ],
  imports: [
    GameRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GameModule {
}
