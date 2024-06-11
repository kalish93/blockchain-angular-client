import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_ELECTION_DATA, POST_ELECTION_DATA } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  convertUnixToFormattedDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds())
      .padStart(3, '0')
      .slice(0, 2); // Get first 2 digits of milliseconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  recordData(
    electionId: String,
    candidateId: String,
    candidateName: String
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    let data = {
      electionId: electionId,
      candidateId: candidateId,
      candidateName: candidateName,
    };
    return this.http.post<any>(POST_ELECTION_DATA, data, httpOptions);
  }

  getRecordedData(
    electionId: string,
    createdTime: any,
    endedTime: any
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    const createdTimeFormatted = this.convertUnixToFormattedDate(createdTime);
    const endedTimeFormatted = this.convertUnixToFormattedDate(endedTime);

    console.log('IN THE SERVICE');

    const url = `${
      GET_ELECTION_DATA
    }/${electionId}?createdTime=${encodeURIComponent(
      createdTimeFormatted
    )}&endedTime=${encodeURIComponent(endedTimeFormatted)}`;

    return this.http.get<any>(url, httpOptions);
  }
}
