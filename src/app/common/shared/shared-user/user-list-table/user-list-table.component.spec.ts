import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListTableComponent } from './user-list-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('UserListTableComponent', () => {
  let component: UserListTableComponent;
  let fixture: ComponentFixture<UserListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,MatTableModule,MatButtonModule,MatProgressSpinnerModule],
      declarations: [UserListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain the following column names: name, email, phone, actions', async () => {
    const columnNames = component.displayedColumns
    expect(columnNames).toEqual([
      'name',
      'email',
      'phone',
      'actions',
    ]);
  });

});
