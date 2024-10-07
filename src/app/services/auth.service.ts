import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Md5 } from 'ts-md5';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.betaseries.com/members/auth';

  constructor(private http: HttpClient) { }

  private apiKey = '370135354801';

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('login', username)
      .set('password', this.encryptPassword(password))
      .set('v', '3.0')
      .set('key', this.apiKey);

    return this.http.post(this.apiUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }
  getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }
  private encryptPassword(password: string): string {
  
    return Md5.hashStr(password) as string;
  
  }

  
}
