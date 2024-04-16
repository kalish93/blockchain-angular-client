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

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        
        Accept: 'application/json',
      }),
    };
    return this.http.post<any>(UPLOAD_IMG_URL, formData, httpOptions);
  }
}
