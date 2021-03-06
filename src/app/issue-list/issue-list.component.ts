import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Issue, RootState } from '../store';
import * as fromIssue from "../store/issue/issue.selectors";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent{

  issues$!: Observable<Issue[]>;

  constructor(private store: Store<RootState>) { 
    this.issues$ = store.pipe(fromIssue.selectAllLoaded());
  }

}
