import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private apiUrl = 'https://your-api.com/leads'; // 🔁 replace with real API

  constructor(private http: HttpClient) {}

  getLeads() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('API Failed, using dummy data ⚠️', error);
        return of(null); // return null if API fails
      })
    );
  }

  sendDM(data: any) {
  return this.http.post('https://your-api.com/send-dm', data);
}
}