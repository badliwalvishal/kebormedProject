import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { LayoutModule } from '../common/layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutModule,
    MatCardModule,
    MatSlideToggleModule
  ]
})
export class SettingsModule { }
