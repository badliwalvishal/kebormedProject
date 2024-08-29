import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities, deleteEntities, getEntity, addEntities } from '@ngneat/elf-entities';
import { User } from '../../common/interface/user.model';
import { startWith } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class UserStore {
  private store = createStore(
    { name: 'userStore' },
    withEntities<User>()
  );

  constructor(private router:Router) {}

  users$ = this.store.pipe(selectAllEntities(),startWith([]));

  getAllUsers(): User[] {
    return Object.values(this.store.getValue().entities);
  }

  getUserById(userId: number): User {
    const user = this.store.query(getEntity(userId));
    if (!user) {
      this.router.navigate(['/user']);
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }

  setUsers(users: User[]) {
    this.store.update(setEntities(users));
  }

  deleteUser(userId: number) {
    this.store.update(deleteEntities(userId));
  }

  addUser(user: User) {
    this.store.update(addEntities(user));
  }

}
