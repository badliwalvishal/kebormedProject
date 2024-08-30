import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user.component';
import { UserService } from './service/user.service';
import { UserStore } from './store/user.store';
import { RouterOutlet } from '@angular/router';

const mockUsers = [
  {
    id: 1,
    name: 'Kunal Mahajan',
    city: 'Lucknow',
    email: 'kunalmahajan@gmail.com',
    mobile: '9088999987',
    country: 'INDIA',
    age: '28'
  }
];

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceStub: Partial<UserService>;
  let userStoreStub: Partial<UserStore>;
  let matDialogStub: Partial<MatDialog>;

  beforeEach(async () => {
    userServiceStub = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of(mockUsers))
    };
    userStoreStub = {
      setUsers: jasmine.createSpy('setUsers')
    };
    matDialogStub = {};
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports:[RouterOutlet],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: UserStore, useValue: userStoreStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should subscribe to getUsers and store the data in UserStore on init', () => {
    expect(userServiceStub.getUsers).toHaveBeenCalledTimes(1);
    expect(userStoreStub.setUsers).toHaveBeenCalledWith(mockUsers);
  });

  it('should add the subscription to the subscriptions list', () => {
    expect(component['subscriptions'].closed).toBeFalse();
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    component.ngOnDestroy();
    expect(component['subscriptions'].closed).toBeTrue();
  });
});
