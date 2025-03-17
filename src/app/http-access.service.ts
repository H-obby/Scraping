import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Feat } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpAccessService {
  constructor(private http: HttpClient) { }

  subscription!: Subscription;

  fetchData(url:string): Observable<any> {
    return this.http.get(url);
  }

  async getFeats(): Promise<Feat[]>{
    const data = await fetch("http://localhost:3000/dons");
    return (await data.json()) ?? [];
  }

  async getFeatById(id: number): Promise<Feat>{
    console.log(`id (in HttpAccessService) = ${id}`);
    const data = await fetch(`http://localhost:3000/dons/${id}`);
    return (await data.json()) ?? [];
  }

  async writeFeats(data: Feat[]){
    return this.http.post<Feat[]>("http://localhost:3000/dons", data)
  }
}
