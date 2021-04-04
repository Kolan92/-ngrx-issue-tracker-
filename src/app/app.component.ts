import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromIssues from '../app/store/issue/issue.selectors'
import { RootState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stats$!: Observable<fromIssues.IssueStats>;

  title = 'ngrx-issue-tracker';

  constructor(private store: Store<RootState>) {
    this.stats$ = store.select(fromIssues.selectStats);
  }
}
