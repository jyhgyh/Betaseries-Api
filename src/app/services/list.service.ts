import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'https://api.betaseries.com';  
  private apiKey = '165a7f89fe8f';  

  constructor(private http: HttpClient) {}

  getSeries(page: number, itemsPerPage: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-BetaSeries-Key': this.apiKey
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', itemsPerPage.toString()); 

    return this.http.get<any>(`${this.apiUrl}/shows/list?order=popularity`, { headers, params });
  }

  addToWatchlist(seriesId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-BetaSeries-Key': this.apiKey
    });

    return this.http.post(`${this.apiUrl}/shows/show`, { id: seriesId }, { headers });
  }
}
