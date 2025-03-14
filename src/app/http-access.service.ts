import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpAccessService {
  constructor(private http: HttpClient) { }

  subscription!: Subscription;

  fetchData(url:string): Observable<any> {
    return this.http.get(url);
  }

  getFeats(){
    this.subscription = this.fetchData("http://localhost:3000/dons").subscribe({
      next: (data) => {
        return data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      }
    });
  }
}
