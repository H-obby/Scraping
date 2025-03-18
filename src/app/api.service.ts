// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
