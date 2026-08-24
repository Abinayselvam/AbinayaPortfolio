import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = 'https://localhost:7104/api/Projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }
}