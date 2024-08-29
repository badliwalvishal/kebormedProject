import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User, UserCreate } from '../../common/interface/user.model';
import { UserStore } from '../store/user.store';
import { UserService } from '../service/user.service';
import { ConfirmationDialogComponent } from '../../common/shared/confirmation-dialog/confirmation-dialog.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserFormComponent } from '../../common/shared/shared-user/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  public users$!: Observable<User[]>;
  private subscriptions = new Subscription();

  constructor(private userService: UserService, private userStore: UserStore, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.users$ = this.userStore.users$;
  }

  onDeleteUserConfirmation(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirmation-box'
    });
    const dialogDeleteSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
    this.subscriptions.add(dialogDeleteSub);
  }

  deleteUser(id: number) {
    const deleteSub = this.userService.deleteUser(id).subscribe(() => {
      this.snackBar.open('User deleted', 'Close', {
        duration: 3000,
      }); 
    });
    this.subscriptions.add(deleteSub);
  }

  onImport() {
    const importSub = this.users$.subscribe(users => {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['Name', 'Email', 'Phone', 'Country', 'Age']],
        body: users.map(user => [user.name, user.email, user.mobile, user.country, user.age])
      });
      doc.save('users.pdf');
    });
    this.subscriptions.add(importSub);
  }

  openUserFormDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
    });

    const dialogUserFormSub = dialogRef.afterClosed().subscribe((result:UserCreate) => {
      if (result) {
        this.userService.createUser(result).subscribe(
          {
            next: () => {
              this.snackBar.open('User created successfully', 'Close', {
                duration: 3000,
              }); 
            },
            error: () => {
              this.snackBar.open('Error occured while creating user', 'Close', {
                duration: 3000,
              });
            }
          }
        );
      }
    });
    this.subscriptions.add(dialogUserFormSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
