import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { UserStore } from './store/user.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private userService: UserService, private userStore: UserStore) { }

  ngOnInit() {
    const userSub = this.userService.getUsers().subscribe(data => {
      this.userStore.setUsers(data);
    });
    this.subscriptions.add(userSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
