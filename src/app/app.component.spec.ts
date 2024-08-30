import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from './common/layout/navigation/navigation.component';
import { SidebarComponent } from './common/layout/sidebar/sidebar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule
      ],
      declarations: [AppComponent,NavigationComponent,SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('applyTheme', () => {
    afterEach(() => {
      document.body.classList.remove('dark-theme', 'light-theme');
      localStorage.clear();
    });

    it('should apply light theme when theme is set to anything other than "dark" in localStorage', () => {
      localStorage.setItem('theme', 'light');
      component.applyTheme();
      expect(document.body.classList.contains('light-theme')).toBeTrue();
      expect(document.body.classList.contains('dark-theme')).toBeFalse();
    });

    it('should apply light theme when no theme is set in localStorage', () => {
      component.applyTheme();
      expect(document.body.classList.contains('light-theme')).toBeTrue();
      expect(document.body.classList.contains('dark-theme')).toBeFalse();
    });
  });
});
