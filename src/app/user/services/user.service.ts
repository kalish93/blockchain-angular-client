import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRequest, VerifyUserEmailRequest } from '../models/user-request';
import { UserResponse } from '../models/user-response';
import { REGISTER_URL, VERIFY_EMAIL_URL } from '../../core/constants/api-endpoints';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  register(request: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(REGISTER_URL, request, this.httpOptions);
  }

  verifyEmail(request: VerifyUserEmailRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(VERIFY_EMAIL_URL, request, this.httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(REGISTER_URL, this.httpOptions);
  }
}
