import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRequest } from '../models/user-request';
import { UserResponse } from '../models/user-response';
import { REGISTER_URL } from '../../core/constants/api-endpoints';

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


}