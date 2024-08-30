import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SubNavigationComponent } from '../../common/layout/sub-navigation/sub-navigation.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent, SubNavigationComponent],
      imports: [MatCardModule, MatSlideToggleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme on slide-toggle change', async () => {
    const slideToggle = await loader.getHarness(MatSlideToggleHarness);
    await slideToggle.toggle();
    expect(component.isDarkMode).toBe(true);
    expect(document.body.classList).toContain('dark-theme');
    expect(document.body.classList).not.toContain('light-theme');

    await slideToggle.toggle();
    expect(component.isDarkMode).toBe(false);
    expect(document.body.classList).toContain('light-theme');
    expect(document.body.classList).not.toContain('dark-theme');
  });
});
