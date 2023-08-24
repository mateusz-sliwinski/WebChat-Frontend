import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorReportService {
    api_url: string = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }

    reportError(description: string): Observable<any> {
        const payload = { description };
        return this.http.post(this.api_url + 'issue_tracking/report/', payload);
    }
}