import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatHeaderCellHarness } from '@angular/material/table/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { UserListTableComponent } from './user-list-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

describe('UserListTableComponent', () => {
  let component: UserListTableComponent;
  let fixture: ComponentFixture<UserListTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,MatTableModule,MatButtonModule],
      declarations: [UserListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should contain the following column labels: Name, Email, Phone, Actions', async () => {
    const columnLabels = await getColumnLabels();
    expect(columnLabels).toEqual([
      'Name',
      'Email',
      'Phone',
      'Actions',
    ]);
  });

  it('should contain the following column names: name, email, phone, actions', async () => {
    const columnNames = await getColumnNames();
    expect(columnNames).toEqual(component.displayedColumns);
    expect(columnNames).toEqual([
      'name',
      'email',
      'phone',
      'actions',
    ]);
  });
  
  async function getColumnLabels() {
    const columns = await loader.getAllHarnesses(MatHeaderCellHarness);
    return Promise.all(columns.map(async column => await column.getText()));
  }

  async function getColumnNames() {
    const columns = await loader.getAllHarnesses(MatHeaderCellHarness);
    return Promise.all(columns.map(async column => await column.getColumnName()));
  }
});
