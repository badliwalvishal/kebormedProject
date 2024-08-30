import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a home link with correct routerLink', () => {
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/home"]'));
    expect(homeLink).toBeTruthy();
    const homeText = homeLink.nativeElement.textContent.trim();
    expect(homeText).toContain('Home');
  });

  it('should have a users link with correct routerLink', () => {
    const usersLink = fixture.debugElement.query(By.css('a[routerLink="/user"]'));
    expect(usersLink).toBeTruthy();
    const usersText = usersLink.nativeElement.textContent.trim();
    expect(usersText).toContain('Users');
  });

  it('should have a settings link with correct routerLink', () => {
    const settingsLink = fixture.debugElement.query(By.css('a[routerLink="/settings"]'));
    expect(settingsLink).toBeTruthy();
    const settingsText = settingsLink.nativeElement.textContent.trim();
    expect(settingsText).toContain('Settings');
  });

});
