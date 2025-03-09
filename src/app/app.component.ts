import { Component } from '@angular/core';
import {} from './scripts/scraper'

@Component({
  selector: 'app-root',
  imports: [Feats],
  template: `
    <main>
      <button class="primary" type="button" (click)="">Search</button>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scraping';
}
