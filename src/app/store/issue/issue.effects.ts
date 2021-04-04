import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { RootState } from '..';
import { Issue } from './issue';
import * as IssueActions from './issue.actions';
import * as fromIssue from "./issue.selectors";

@Injectable()
export class IssueEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private http: HttpClient) {}

  submit$ = createEffect(() => 
    this.actions$.pipe(
      ofType(IssueActions.submit),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(fromIssue.selectAll)))
      ),     
      filter(([action, issues]) => issues.every(issue => issue.title !== action.issue.title)),
      mergeMap(([action, issues]) => this.http.post<Issue>('/api/issues', action.issue)),
      map(issue => IssueActions.submitSuccess({issue})),
      catchError(err => of(IssueActions.submitFailure({error: err})))
  ));

}
