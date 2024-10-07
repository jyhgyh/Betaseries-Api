import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = 'https://api.betaseries.com';
  private apiKey = '370135354801';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getEpisodeDetail(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}/episodes/display`;
    const params = new HttpParams()
      .set('id', episodeId.toString())
      .set('key', this.apiKey)
      .set('v', '3.0');

    return this.http.get<any>(url, { params });
  }
  getComments(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}/comments/comments?`;
    const params = new HttpParams()
      .set('type', 'episode')
      .set('id', episodeId.toString()) 
      .set('nbpp', '25')
      .set('order', 'desc')

      .set('key', this.apiKey)
      .set('v', '3.0');

    return this.http.get<any>(url, { params });
  }
  postComment(episodeId: number, text: string, reference: string): Observable<any> {
    const url = `${this.apiUrl}/comments/comment`;
    const params = new HttpParams()
      .set('type', 'episode')
      .set('id', episodeId.toString())
      .set('text', text)
      .set('reference', reference);

    const token = this.authService.getToken(); // Récupérer le token

    const headers = new HttpHeaders()
      .set('X-BetaSeries-Key', this.apiKey)
      .set('X-BetaSeries-Version', '3.0')
      .set('Authorization', `Bearer ${token}`); // Ajouter le token

    return this.http.post<any>(url, {}, { headers, params });
  }
  asWatched(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}/episodes/watched`;
    const params = new HttpParams()
      .set('type', 'episode')
      .set('id', episodeId.toString())

    const token = this.authService.getToken(); 

    const headers = new HttpHeaders()
      .set('X-BetaSeries-Key', this.apiKey)
      .set('X-BetaSeries-Version', '3.0')
      .set('Authorization', `Bearer ${token}`); 

    return this.http.post<any>(url, {}, { headers, params });
  }

  unmarkWatched(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}/episodes/watched`;
    const params = new HttpParams()
      .set('type', 'episode')
      .set('id', episodeId.toString());

    const token = this.authService.getToken(); 

    const headers = new HttpHeaders()
      .set('X-BetaSeries-Key', this.apiKey)
      .set('X-BetaSeries-Version', '3.0')
      .set('Authorization', `Bearer ${token}`); 

    return this.http.delete<any>(url, { headers, params }); 
  }

}
