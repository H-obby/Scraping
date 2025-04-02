import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { HttpAccessService } from "./../http-access.service";
import { Subscription } from "rxjs";
import { Feat } from '../interfaces';
import { FeatSmallComponent } from '../feat-small/feat-small.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feat-display',
  imports: [CommonModule, FeatSmallComponent],
  templateUrl: './feat-display.component.html',
  styleUrl: './feat-display.component.css'
})
export class FeatDisplayComponent {
  constructor(private httpAccessService: HttpAccessService, private apiService:ApiService) {
    this.data = []
    this.counter = 0
    this.finalTime = 0
  };

  data: Feat[] = []
  title = "feat_display";
  loading = false;
  counter: number;
  finalTime: number
  
  async handleSearchClick() {
    try {
      this.data =  await this.httpAccessService.getFeats();
    } catch (error) {
      console.error('Error:', error);
    };
  };
  
  async handleScrapClick(){
    const startTime = Date.now()
    this.loading = true;
    setInterval(() => {
      this.counter = Date.now() - startTime;
    });
    //console.log(`${await this.apiService.scrapFeats().then((result: Feat[])=>{})} writen in file`);
    await this.apiService.scrapFeats().then(async (response: Feat[]) => {
      this.loading = false;
      this.finalTime = this.counter
      this.httpAccessService.writeFeats(response);
      console.log(`${JSON.stringify(response[-1])} writen in file`);
    }).catch((e) => console.error('Error fetching HTML:', e));
    this.loading = false;
    this.finalTime = this.counter
  }
}
