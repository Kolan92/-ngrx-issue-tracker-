import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Issue } from './store/issue/issue';
import { Issues } from './store/issue/issue.state';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  save(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>('/api/issues', issue);
  }

  resolve(issueId: string): Observable<void> {
    return this.http.post<void>('/api/issues/resolve', issueId)
      .pipe(catchError(() => EMPTY));
  }

  getAll(): Observable<Issue[]>{
    return this.http.get<Issue[]>('/api/issues');
  }
}
