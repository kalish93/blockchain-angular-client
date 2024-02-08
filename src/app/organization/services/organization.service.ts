import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization, OrganizationWithMembers } from '../models/organization.model';
import { Observable } from 'rxjs';
import { ORGANIZATIONURL } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(ORGANIZATIONURL, this.httpOptions);
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(ORGANIZATIONURL, organization, this.httpOptions);
  }

  getOrganization(id: string): Observable<OrganizationWithMembers> {
    return this.http.get<OrganizationWithMembers>(`${ORGANIZATIONURL}/${id}`, this.httpOptions);
  }
}
