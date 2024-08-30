import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../common/shared/shared.module';
import { LayoutModule } from '../common/layout/layout.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    LayoutModule,
    MatCardModule,
   ]
})
export class HomeModule { }
