import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Serie {
  id?: number;
  title: string;
  channel: string;
  rating: number;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeriesService {
  private url = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.url);
  }

  create(payload: Serie): Observable<any> {
    return this.http.post(this.url, payload);
  }
}