import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/contact.model';
import { environment } from '../../../environment.prod';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = `${environment.apiUrl}/Contact/send`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }
}