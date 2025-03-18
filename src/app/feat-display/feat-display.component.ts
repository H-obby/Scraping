import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { HttpAccessService } from "./../http-access.service";
import { Subscription } from "rxjs";
import { Feat } from '../interfaces';
import { FeatSmallComponent } from '../feat-small/feat-small.component';
import { FeatsScrap } from '../../scripts/feats-scrap';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feat-display',
  imports: [CommonModule, FeatSmallComponent],
  templateUrl: './feat-display.component.html',
  styleUrl: './feat-display.component.css'
})
export class FeatDisplayComponent {
  data: Feat[]
  constructor(private httpAccessService: HttpAccessService, private apiService:ApiService) {
    this.data = []
  };
  title = "feat_display";
  
  async handleSearchClick() {
    try {
      this.data =  await this.httpAccessService.getFeats();
    } catch (error) {
      console.error('Error:', error);
    };
  };
  
  async handleScrapClick(){
    this.apiService.getItems().subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }
}
