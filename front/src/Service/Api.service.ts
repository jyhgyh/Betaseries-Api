import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetaseriesService {

  private apiUrl = 'https://api.betaseries.com';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/shows/list?key=YOUR_API_KEY`);
  }
}
