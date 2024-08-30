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
import { UserFormComponent } from './shared-user/user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedChartComponent } from './shared-chart/shared-chart.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    UserListTableComponent,
    UserViewComponent,
    UserFormComponent,
    SharedChartComponent
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CanvasJSAngularChartsModule
  ],
  exports:[ConfirmationDialogComponent,UserListTableComponent,UserViewComponent,UserFormComponent,SharedChartComponent]
})
export class SharedModule { }
