import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.services';

const httpOptions = {
  headers: new HttpHeaders(),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient, private configService: ConfigService) { }

  api_url: string = this.configService.api_url;

  inputBoard(data: FormData): Observable<any> {
    const endpoint = `${this.api_url}board/posts/`;
    return this.http.post(endpoint, data, httpOptions);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}board/posts/`);
  }

  likePost(postId: string): Observable<any> {
    const likeData = { postId };
    return this.http.post<any>(
      `${this.api_url}board/like/${postId}/`,
      likeData
    );
  }

  getPostDetails(postId: string): Observable<any> {
    return this.http.get<any>(`${this.api_url}board/posts/${postId}/`);
  }

  getCommentsForPost(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}board/comments/`);
  }

  createComment(commentData: any): Observable<any> {
    const endpoint = `${this.api_url}board/comments/`;
    return this.http.post(endpoint, commentData);
  }

  getLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}board/likes/`);
  }
}
