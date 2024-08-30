import { Component } from '@angular/core';
import { User } from '../../common/interface/user.model';
import { UserStore } from '../store/user.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {
  user: User;

  constructor(private route: ActivatedRoute, private userStore: UserStore) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.userStore.getUserById(id);
  }

}
