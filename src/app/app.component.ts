import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule} from "@angular/common";
import FeatsScrap from "../scripts/scraper"
import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises } from 'dns';
import { readFile, readFileSync, writeFile } from 'fs';
import { routes } from "./app.routes";
import {Feat} from "./interfaces"
import { HttpAccessService } from "./http-access.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  imports: [CommonModule],
  template: `
    <main>
      <button class="primary" type="button" (click)="handleButtonClick()">Scrap gemmaline for feats</button>
      <hr>
      <p *ngFor="let truc of data">{{ truc | json }}</p>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  db_url = 'http://localhost:3000/';
  title = "truc";
  state = "idle";
  data: JSON[] = [];
  subscription!: Subscription;

  printjson(json: JSON[]){
    return json[0]
  }

  constructor(private httpAccessService: HttpAccessService) { }
  
  async handleButtonClick() {
    try {
      await this.getFeats();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async test(): Promise<string> {
    this.state = "yipee";
    return "lol";
  }

  getFeats(){
    this.subscription = this.httpAccessService.fetchData(this.db_url+"dons").subscribe({
      next: (data) => {
        this.data = data;
        console.log(JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      }
    });
  }

  //ngOnInit(): void {
  //  this.subscription = this.httpAccessService.fetchData(this.db_url+"dons").subscribe({
  //    next: (data) => {
  //      this.data = data;
  //    },
  //    error: (error) => {
  //      console.error('Error fetching data:', error);
  //    },
  //    complete: () => {
  //      console.log('Data fetching completed');
  //    }
  //  });
  //}

  //ngOnDestroy(): void {
  //  this.subscription.unsubscribe();
  //}
}
