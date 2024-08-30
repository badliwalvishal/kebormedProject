import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../service/user.service';
import { UserStore } from '../store/user.store';
import { ConfirmationDialogComponent } from '../../common/shared/confirmation-dialog/confirmation-dialog.component';
import { UserFormComponent } from '../../common/shared/shared-user/user-form/user-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { User } from '../../common/interface/user.model';
import { SubNavigationComponent } from '../../common/layout/sub-navigation/sub-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListTableComponent } from '../../common/shared/shared-user/user-list-table/user-list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const mockUser: User = {
  id: 1,
  name: 'Kunal Mahajan',
  city: 'Lucknow',
  email: 'kunalmahajan@gmail.com',
  mobile: '9088999987',
  country: 'INDIA',
  age: '28'
};

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let loader: HarnessLoader;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockUserStore: jasmine.SpyObj<UserStore>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['deleteUser', 'createUser']);
    mockUserStore = jasmine.createSpyObj('UserStore', ['deleteUser', 'users$']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent,SubNavigationComponent,UserListTableComponent ],
      imports: [ MatMenuModule, MatIconModule, MatButtonModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatProgressSpinnerModule ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: UserStore, useValue: mockUserStore },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    mockUserStore.users$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Menu interactions', () => {
    it('should open the menu and trigger the Create dialog', async () => {
      const menuHarness = await loader.getHarness(MatMenuHarness);
      await menuHarness.open();

      const createButton = await menuHarness.getItems({ text: /Create/i });
      await createButton[0].click();

      expect(mockMatDialog.open).toHaveBeenCalledWith(UserFormComponent, { width: '600px' });
    });
  });

  describe('onDeleteUserConfirmation', () => {
    it('should open confirmation dialog and delete user if confirmed', async () => {
        const userId = 1;
        const dialogRef = { afterClosed: () => of(true),
        } as MatDialogRef<ConfirmationDialogComponent>;
        mockMatDialog.open.and.returnValue(dialogRef);
        const deleteSpy = spyOn(component, 'deleteUser');
        await component.onDeleteUserConfirmation(userId);
        expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, { panelClass: 'confirmation-box' });
        dialogRef.afterClosed().subscribe(result => {
          expect(result).toBe(true);
          expect(deleteSpy).toHaveBeenCalledWith(userId);
        });
      });

    it('should not delete user if canceled', async () => {
      const userId = 1;
      const dialogRef = { afterClosed: () => of(false),
      } as MatDialogRef<ConfirmationDialogComponent>;
      mockMatDialog.open.and.returnValue(dialogRef);
      const deleteSpy = spyOn(component, 'deleteUser');
      await component.onDeleteUserConfirmation(userId);
      expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {panelClass: 'confirmation-box'});
      dialogRef.afterClosed().subscribe(result => {
        expect(result).toBe(false);
        expect(deleteSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('openUserFormDialog', () => {
    it('should open user form dialog and create user if form data is provided', async () => {
      const dialogRef = { afterClosed: () => of(mockUser),
      } as MatDialogRef<ConfirmationDialogComponent>;
      mockMatDialog.open.and.returnValue(dialogRef);
      mockUserService.createUser.and.returnValue(of({} as User));
      await component.openUserFormDialog();
      expect(mockMatDialog.open).toHaveBeenCalledWith(UserFormComponent, { width: '600px' });
      dialogRef.afterClosed().subscribe(result => {
        expect(result).toEqual(mockUser);
        expect(mockUserService.createUser).toHaveBeenCalledWith(result);
      });
    });

    it('should not create user if form data is not provided', async () => {
      const dialogRef = { afterClosed: () => of(null),
      } as MatDialogRef<ConfirmationDialogComponent>;
      mockMatDialog.open.and.returnValue(dialogRef);
      await component.openUserFormDialog();
      expect(mockMatDialog.open).toHaveBeenCalledWith(UserFormComponent, { width: '600px' });
      dialogRef.afterClosed().subscribe(result => {
        expect(result).toBeNull();
        expect(mockUserService.createUser).not.toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
