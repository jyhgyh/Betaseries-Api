import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoAboutSeriesService {
  private apiUrl = 'https://api.betaseries.com';
  private apiKey = '165a7f89fe8f';

  constructor(private http: HttpClient) {}

  getSeriesInfo(seriesId: number): Observable<any> {
    const url = `${this.apiUrl}/shows/display`;
    const params = new HttpParams()
      .set('id', seriesId.toString())
      .set('key', this.apiKey)
      .set('v', '3.0');

    return this.http.get<any>(url, { params });
  }
  getSeriesSeasons(seriesId: number): Observable<any> {
    const url = `${this.apiUrl}/shows/seasons`;
    const params = new HttpParams()
      .set('id', seriesId.toString())
      .set('key', this.apiKey)
      .set('v', '3.0');

    return this.http.get<any>(url, { params });
  }
  getEpisodes(showId: number, seasonNumber: number): Observable<any> {
    const url = `${this.apiUrl}/shows/episodes?id=${showId}&season=${seasonNumber}`;
    const params = new HttpParams()
      .set('id', showId.toString())
      .set('key', this.apiKey)
      .set('v', '3.0');

    return this.http.get<any>(url, { params });
  }
}
