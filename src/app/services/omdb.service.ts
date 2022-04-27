import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { okey } from '../../cred';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  baseUrl: string = "http://www.omdbapi.com";
  constructor(
    private http: HttpClient,
  ) { }
   media(search:string,page:number):Promise<Observable<any>>{
    return this.http.get<any>(`${this.baseUrl}/?apikey=${okey}&s=${search}&page=${page}`).toPromise()
  }
}
