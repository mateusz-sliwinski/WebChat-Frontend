import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(),
  withCredentials: true,
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  api_url: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}


  inputBoard(data:FormData): Observable<any> {
    const endpoint = `${this.api_url}board/posts/`;
    return this.http.post(endpoint, data, httpOptions);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}board/posts/`);
  }
}