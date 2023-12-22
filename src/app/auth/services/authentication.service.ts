import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { LOGIN_URL } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, request, this.httpOptions);
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
