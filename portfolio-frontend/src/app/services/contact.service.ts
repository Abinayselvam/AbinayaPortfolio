import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, ApiResponse } from '../models/contact.model';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/Contact/send` // Your .NET backend URL

  constructor(private http: HttpClient) {}

  sendContactForm(form: ContactForm): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ApiResponse>(`${this.baseUrl}/send`, form, { headers });
  }
}