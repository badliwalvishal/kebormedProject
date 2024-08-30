import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NavigationComponent,
    SubNavigationComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    NavigationComponent,
    SubNavigationComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
