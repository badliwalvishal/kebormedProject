import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UserListTableComponent } from './shared-user/user-list-table/user-list-table.component';
import { UserViewComponent } from './shared-user/user-view/user-view.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    UserListTableComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[ConfirmationDialogComponent,UserListTableComponent,UserViewComponent]
})
export class SharedModule { }
