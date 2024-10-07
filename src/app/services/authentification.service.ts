import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetaSeriesService {
  private apiUrl = 'https://api.betaseries.com';
  private apiKey = '165a7f89fe8f';

  constructor(private http: HttpClient) { }

  // Exemple pour obtenir des informations d'une série
  getShowData(showId: number): Observable<any> {
    const headers = new HttpHeaders({
      'X-BetaSeries-Key': this.apiKey
    });

    return this.http.get(`${this.apiUrl}/shows/display`, {
      headers: headers,
      params: {
        id: showId.toString()
      }
    });
  }
}
