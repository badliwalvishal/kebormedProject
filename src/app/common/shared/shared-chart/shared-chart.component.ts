import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-chart',
  templateUrl: './shared-chart.component.html'
})
export class SharedChartComponent {
  @Input() chartOptions = {};
}

