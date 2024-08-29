import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../common/interface/user.model';
import { UserStore } from '../store/user.store';
import { UserService } from '../service/user.service';
import { ConfirmationDialogComponent } from '../../common/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  public users$!: Observable<User[]>;
  private subscriptions = new Subscription();

  constructor(private userService: UserService, private userStore: UserStore, private dialog: MatDialog) { }

  ngOnInit() {
    this.users$ = this.userStore.users$;
  }

  onDeleteUserConfirmation(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});
    const dialogDeleteSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
    this.subscriptions.add(dialogDeleteSub);
  }

  deleteUser(id: number) {
    const deleteSub = this.userService.deleteUser(id).subscribe(() => {
    });
    this.subscriptions.add(deleteSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
