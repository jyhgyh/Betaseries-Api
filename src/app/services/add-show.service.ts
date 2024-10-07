import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddShowService {


  private apiUrl = 'https://api.betaseries.com/shows/show';
  private apiKey = '370135354801';  // Clé API BetaSeries

  constructor(private http: HttpClient) { }

  addShowToAccount(showId: string, token: string) {
    const headers = new HttpHeaders({
      'X-BetaSeries-Key': this.apiKey,
      'X-BetaSeries-Token': token
    });

    const body = { id: showId };

    return this.http.post(this.apiUrl, body, { headers });
  }

  deleteShowFromAccount(showId: string, token: string) {
    const headers = new HttpHeaders({
      'X-BetaSeries-Key': this.apiKey,
      'X-BetaSeries-Token': token
    });

    const url = `${this.apiUrl}?id=${showId}`;  // Ajoutez l'ID de la série dans l'URL

    return this.http.delete(url, { headers });
  }
}
