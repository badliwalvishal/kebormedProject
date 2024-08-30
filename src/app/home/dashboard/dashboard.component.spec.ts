import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { SharedChartComponent } from '../../common/shared/shared-chart/shared-chart.component';
import { SubNavigationComponent } from '../../common/layout/sub-navigation/sub-navigation.component';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent, 
        SharedChartComponent, 
        SubNavigationComponent 
      ],
      imports: [ MatCardModule,CanvasJSAngularChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  it('should display correct progress labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('.progress-label'));
    const labelTexts = labels.map(label => label.nativeElement.textContent.trim());
    expect(labelTexts).toContain('Total Users');
    expect(labelTexts).toContain('Active Users');
    expect(labelTexts).toContain('Inactive Users');
    expect(labelTexts).toContain('Old Age Users');
    expect(labelTexts).toContain('Young Users');
  });
});
