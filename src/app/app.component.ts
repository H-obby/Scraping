import { Component } from "@angular/core";
import { CommonModule} from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = "Scraping"
}
