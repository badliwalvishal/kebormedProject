import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app/app.component';
import { NavigationComponent } from '../app/common/layout/navigation/navigation.component';
import { SidebarComponent } from '../app/common/layout/sidebar/sidebar.component';
import { NgZone } from '@angular/core';
import { SharedModule } from '../app/common/shared/shared.module';
import { LayoutModule } from '../app/common/layout/layout.module';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { of } from 'rxjs';
import { MatButtonHarness } from '@angular/material/button/testing';
import { UserService } from '../app/user/service/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { User } from '../app/common/interface/user.model';

const user: User[] = [
  { id: 1, name: 'Kunal Mahajan', city: 'Lucknow', email: 'kunalmahajan@gmail.com', mobile: '9088999987', country: 'INDIA', age: '28' },
  { id: 2, name: 'Mohit Kataria', city: 'Agra', email: 'mohitkataria@gmail.com', mobile: '8076554431', country: 'INDIA', age: '25' }
];
describe('IntegrationComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let ngZone: NgZone;

  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of(user));

    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavigationComponent, SidebarComponent],
      imports: [
        RouterModule.forRoot([
          { path: 'home', loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule) },
          { path: 'user', loadChildren: () => import('../app/user/user.module').then(m => m.UserModule) },
          { path: 'settings', loadChildren: () => import('../app/settings/settings.module').then(m => m.SettingsModule) },
        ]),
        MatIconModule,
        SharedModule,
        LayoutModule,
        NoopAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    ngZone = TestBed.inject(NgZone);
    fixture.detectChanges();
    await ngZone.run(() => router.navigateByUrl('/user'));

  });

  it('should navigate to /user and display user content', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const tableHarness = await loader.getHarness(MatTableHarness);
    const rows = await tableHarness.getRows();
    expect(location.path()).toBe('/user');
    expect(rows.length).toBeGreaterThan(1);
  });

  it('should delete a user when the delete button is clicked', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const tableHarness = await loader.getHarness(MatTableHarness);
    const rows = await tableHarness.getRows();
    const firstRow = rows[0];
    const cells = await firstRow.getCells();
    const deleteButton = await cells[cells.length - 1].getHarness(MatButtonHarness.with({ selector: '.delete-button' }));
    await deleteButton.click();
    fixture.detectChanges();
    const updatedRows = await tableHarness.getRows();
    expect(updatedRows.length).toBe(rows.length);
  });

  it('should navigate to user details when the view button is clicked', async () => {
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const tableHarness = await loader.getHarness(MatTableHarness);
    const rows = await tableHarness.getRows();
    const firstRow = rows[0];
    const cells = await firstRow.getCells();
    const viewButton = await cells[cells.length - 1].getHarness(MatButtonHarness.with({ selector: '.details-button' }));
    await viewButton.click();
    expect(location.path()).toBe(`/user/detail/1`);
  });
  
});
