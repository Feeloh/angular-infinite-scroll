import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlinesService {

  constructor(private httpclient: HttpClient) { }

  getAirlineServices(page: number): Observable<any> {
    return this.httpclient.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`).pipe(delay(20));
  }
}
