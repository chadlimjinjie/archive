import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchComponent } from './switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    SwitchComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule
  ],
  exports: [
    SwitchComponent
  ]
})
export class SwitchModule { }
