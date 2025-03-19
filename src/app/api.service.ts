// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Feat } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${this.baseUrl}/items`);
  }

  createItem(item: any) {
    return this.http.post(`${this.baseUrl}/items`, item);
  }

  async scrapFeats(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get(`${this.baseUrl}/scrap-feats`));
      return response;
    } catch (error) {
      console.error('Error scraping feats:', error);
      throw error;
    }
  }

  getFeats(){
    return this.http.get(`${this.baseUrl}/get-feats`)
  }
}
