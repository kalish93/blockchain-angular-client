import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLOAD_IMG_URL } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    return this.http.get<string>(UPLOAD_IMG_URL, this.httpOptions);
  }
}
