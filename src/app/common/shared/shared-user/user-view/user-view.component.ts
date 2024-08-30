import { Component, Input } from '@angular/core';
import { User } from '../../../interface/user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {

  @Input() user:User | undefined;

}
