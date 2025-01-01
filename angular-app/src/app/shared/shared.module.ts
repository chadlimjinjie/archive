import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchModule } from './switch/switch.module';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NavBarModule } from './nav-bar/nav-bar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    SwitchModule,
    MatIconModule,
    NavBarModule,
  ]
})
export class SharedModule { }
