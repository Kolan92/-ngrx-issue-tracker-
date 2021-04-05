import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { IssuesService } from 'src/app/issues.service';
import { RootState } from '..';
import * as IssueActions from './issue.actions';
import * as fromIssue from "./issue.selectors";
import { OnInitEffects } from "@ngrx/effects";
import { NotificationsService } from 'src/app/notifications.service';

@Injectable()
export class IssueEffects implements OnInitEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private issues: IssuesService,
    private notifications: NotificationsService) { }

  ngrxOnInitEffects(): Action {
    return IssueActions.load();
  }

  submit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.submit),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(fromIssue.selectAll)))
      ),
      filter(([action, issues]) => issues.every(issue => issue.title !== action.issue.title)),
      mergeMap(([action, issues]) => this.issues.save(action.issue)),
      map(issue => IssueActions.submitSuccess({ issue })),
      catchError(err => of(IssueActions.submitFailure({ error: err })))
    ));

  resolve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.resolve),
      mergeMap(({ issueId }) => this.issues.resolve(issueId).pipe(
        map(() => IssueActions.resolveSuccess()),
        catchError(error => of(IssueActions.resolveFailure({ issueId, error })))
      )
      )));

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.load),
      mergeMap(() => this.issues.getAll()),
      map(issues => IssueActions.loadSuccess({ issues })),
      catchError(error => of(IssueActions.loadFailure({ error })))
    )
  );

  notification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IssueActions.submitSuccess),
        tap(({ issue }) => {
          this.notifications.info(`Issue submitted: ${issue.title}`);
        })
      ),
    { dispatch: false }
  );
}
