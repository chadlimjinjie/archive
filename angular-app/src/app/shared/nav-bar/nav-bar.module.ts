import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
