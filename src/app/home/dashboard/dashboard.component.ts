import { Component } from '@angular/core';
import { UserCount } from '../../common/interface/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Users by Country"
    },
    data: [{
      type: "pie",
      indexLabel: "{name}: {y}",
      dataPoints: [
        { name: "India", y: 5 },
        { name: "England", y: 12 },
        { name: "Japan", y: 1 },
        { name: "China", y: 6 },
        { name: "Usa", y: 4 }
      ]
    }]
  }

  data: UserCount = {
    totalUsers: 24,
    activeUsers: 20,
    oldAgeUsers: 15,
    youngUsers: 9,
    inActiveUsers: 4
  };

  getProgress(value: number): number {
    const max = 10;
    return (value / max) * 100;
  }

  getProgressBackground(value: number, color: string): string {
    const progress = this.getProgress(value);
    return `conic-gradient(${color} ${progress}%, #e0e0e0 ${progress}% 100%)`;
  }

}
