import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Issue, RootState } from '../store';
import { switchMap } from 'rxjs/operators';
import * as fromIssues from "src/app/store/issue/issue.selectors";
import * as IssueActions from 'src/app/store/issue/issue.actions';


@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issue$!: Observable<Issue>

  constructor(private route: ActivatedRoute, private store: Store<RootState>) { 
    this.issue$ = route.params.pipe(
      switchMap(params => this.store.select(fromIssues.selectById, params.id))
    )
  }

  ngOnInit(): void {
  }

  resolve(issueId: string){
    this.store.dispatch(IssueActions.resolve({issueId}));
  }

}
