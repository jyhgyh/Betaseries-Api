import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://api.betaseries.com/members';
  private apiKey = '370135354801'; 

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/infos?v=3.0&key=370135354801`, { headers });
  }
 getUserShows(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    });

   return this.http.get(`https://api.betaseries.com/shows/member?id=${userId}&key=${this.apiKey}`, { headers });
  }
}
