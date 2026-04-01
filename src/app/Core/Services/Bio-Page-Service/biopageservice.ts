import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BioPage } from '../../../models/Biopage.model';

export interface ExistingProduct {
  id: number | string;
  name: string;
  price: string;
  imageUrl: string;
  buyUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BiopageService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  saveBio(payload: BioPage): Observable<unknown> {
    return this.http.post<unknown>(`${this.baseUrl}/bio-pages`, payload);
  }

  getProducts(): Observable<ExistingProduct[]> {
    return this.http.get<ExistingProduct[]>(`${this.baseUrl}/products`);
  }

  getBioPageBySlug(slug: string): Observable<BioPage> {
    return this.http.get<BioPage>(`${this.baseUrl}/bio-pages/${slug}`);
  }
}