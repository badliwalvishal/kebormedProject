import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kebormedProject';
  isDarkMode: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.applyTheme();
    }
  }

  public applyTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(isDarkMode ? 'dark-theme' : 'light-theme');
  }
  
}
