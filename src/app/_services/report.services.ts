import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.services';

@Injectable({
  providedIn: 'root',
})
export class ErrorReportService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  api_url: string = this.configService.api_url;

  reportError(description: string): Observable<any> {
    const payload = { description };
    return this.http.post(this.api_url + 'issue_tracking/report/', payload);
  }
}