import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { HttpAccessService } from "./../http-access.service";
import { Subscription } from "rxjs";
import { Feat } from '../interfaces';
import { FeatSmallComponent } from '../feat-small/feat-small.component';

@Component({
  selector: 'app-feat-display',
  imports: [CommonModule, FeatSmallComponent],
  templateUrl: './feat-display.component.html',
  styleUrl: './feat-display.component.css'
})
export class FeatDisplayComponent {
  constructor(private httpAccessService: HttpAccessService) { };
  db_url = 'http://localhost:3000/';
  title = "truc";
  state = "idle";
  data: Feat[] = [];
  subscription!: Subscription;
    
  async handleButtonClick() {
    try {
      this.data =  await this.httpAccessService.getFeats();
    } catch (error) {
      console.error('Error:', error);
    };
  };
}
