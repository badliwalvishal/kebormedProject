import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserStore } from '../store/user.store';
import { User } from '../../common/interface/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let userStoreSpy: jasmine.SpyObj<UserStore>;

  const mockUsers: User[] = [
    { id: 1, name: 'Kunal Mahajan', city: 'Lucknow', email: 'kunalmahajan@gmail.com', mobile: '9088999987', country: 'INDIA', age: '28' },
    { id: 2, name: 'Mohit Kataria', city: 'Agra', email: 'mohitkataria@gmail.com', mobile: '8076554431', country: 'INDIA', age: '25' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserStore', ['setUsers', 'addUser', 'deleteUser']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: UserStore, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    userStoreSpy = TestBed.inject(UserStore) as jasmine.SpyObj<UserStore>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve users from the API and store them', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
    expect(userStoreSpy.setUsers).toHaveBeenCalledWith(mockUsers);
  });

  it('should retrieve a single user by ID from the API', () => {
    const userId = 1;
    const mockUser = mockUsers[0];
    service.getUser(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should delete a user by ID and remove it from the store', () => {
    const userId = 1;
    service.deleteUser(userId).subscribe();
    const req = httpMock.expectOne(`${service['apiUrl']}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
    expect(userStoreSpy.deleteUser).toHaveBeenCalledWith(userId);
  });

  it('should handle errors', () => {
    const errorMessage = 'Something went wrong; please try again later.';
    service.getUsers().subscribe(
      () => fail('Expected an error, not users'),
      error => expect(error).toBe(errorMessage)
    );
    const req = httpMock.expectOne(service['apiUrl']);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

});
