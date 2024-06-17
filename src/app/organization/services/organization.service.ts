import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Organization,
  OrganizationWithMembers,
  Member,
} from '../models/organization.model';
import { Observable } from 'rxjs';
import { IMAGE_BASE_URL, ORGANIZATIONURL } from '../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
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
    return this.http.post<Organization>(
      ORGANIZATIONURL,
      organization,
      this.httpOptions
    );
  }

  getOrganization(id: string): Observable<OrganizationWithMembers> {
    return this.http.get<OrganizationWithMembers>(
      `${ORGANIZATIONURL}/${id}`,
      this.httpOptions
    );
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(
      `${ORGANIZATIONURL}/members`,
      member,
      this.httpOptions
    );
  }

  getmyOrganizations(userId: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(
      `${ORGANIZATIONURL}/user/${userId}`,
      this.httpOptions
    );
  }

  uploadMembers(file: File, organizationId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('organizationId', organizationId);

    return this.http.post<any>(`${ORGANIZATIONURL}/members/upload`, formData);
  }

  downloadTemplateCsv(): void {
    const url = `${{IMAGE_BASE_URL}}/templates/template.csv`;
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'text/csv' });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'template.csv';
      link.click();
    });
  }

  downloadTemplateXlsx(): void {
    const url = `${{IMAGE_BASE_URL}}/templates/template.xlsx`;
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'template.xlsx';
      link.click();
    });
  }

  toggleOrganizationStatus(organizationId: String): Observable<any> {
    return this.http.put<any>(
      `${ORGANIZATIONURL}/${organizationId}/`,
      this.httpOptions
    );
  }
}
