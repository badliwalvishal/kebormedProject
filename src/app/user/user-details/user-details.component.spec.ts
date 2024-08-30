import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../store/user.store';
import { UserDetailsComponent } from './user-details.component';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserViewComponent } from '../../common/shared/shared-user/user-view/user-view.component';
import { User } from '../../common/interface/user.model';

const mockUser: User = {
  id: 1,
  name: 'Kunal Mahajan',
  city: 'Lucknow',
  email: 'kunalmahajan@gmail.com',
  mobile: '9088999987',
  country: 'INDIA',
  age: '28'
};

describe('UserDetailsComponent', () => {
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userStore: jasmine.SpyObj<UserStore>;

  beforeEach(async () => {
    userStore = jasmine.createSpyObj('UserStore', ['getUserById']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatCardModule
      ],
      declarations: [UserDetailsComponent, UserViewComponent],
      providers: [
        { provide: UserStore, useValue: userStore },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(UserDetailsComponent);
  });

  it('should fetch user by ID from the store', () => {
    userStore.getUserById.and.returnValue(mockUser);
    fixture.detectChanges();
    expect(userStore.getUserById).toHaveBeenCalledWith(1);
  });
});
