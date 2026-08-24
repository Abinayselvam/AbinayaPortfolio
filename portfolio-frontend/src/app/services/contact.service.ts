import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, ApiResponse } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'https://localhost:7104/api/Contact'; // Your .NET backend URL

  constructor(private http: HttpClient) {}

  sendContactForm(form: ContactForm): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ApiResponse>(`${this.baseUrl}/send`, form, { headers });
  }
}