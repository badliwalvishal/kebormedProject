import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interface/user.model';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrl: './user-list-table.component.scss'
})
export class UserListTableComponent {

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  @Input() users:User[] = []
  @Output() deleteUser = new EventEmitter<number>();

  openDeleteConfirmation(userId: number) {
    this.deleteUser.emit(userId);
  }

}
