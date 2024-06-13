import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GET_ELECTION_DATA,
  POST_ELECTION_DATA,
} from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  convertUnixToFormattedDate(unixTimestamp: number | bigint): string {
    console.log('Received Unix Timestamp:', unixTimestamp); // Debugging line

    const timestampInMs = Number(unixTimestamp) * 1000; // Ensure it is converted to a number if it's a bigint and convert to milliseconds
    console.log('Converted to Milliseconds:', timestampInMs); // Debugging line

    const date = new Date(timestampInMs); // Convert Unix timestamp to milliseconds
    console.log('Converted Date:', date); // Debugging line

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds())
      .padStart(3, '0')
      .slice(0, 2); // Get first 2 digits of milliseconds

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    console.log('Formatted Date:', formattedDate); // Debugging line

    return formattedDate;
  }

  recordData(
    electionId: string,
    candidateId: string,
    candidateName: string
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
    electionId: any,
    createdTime: any,
    endedTime: any
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    const createdTimeFormatted = this.convertUnixToFormattedDate(createdTime);
    const endedTimeFormatted = this.convertUnixToFormattedDate(
      Number(endedTime) / 1000
    );

    const url = `${GET_ELECTION_DATA}?electionId=${electionId}&startTime=${encodeURIComponent(
      createdTimeFormatted
    )}&endTime=${encodeURIComponent(endedTimeFormatted)}`;

    let value = this.http.get<any>(url, httpOptions);
    return value;
  }
}
