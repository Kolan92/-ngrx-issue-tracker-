import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NewIssueComponent } from './new-issue/new-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from './store';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { IssuesComponent } from './issues/issues.component';
import { EffectsModule } from '@ngrx/effects';
import { IssueEffects } from './store/issue/issue.effects';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NewIssueComponent,
    IssueListComponent,
    IssueDetailsComponent,
    IssuesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([IssueEffects]),
    InMemoryWebApiModule.forRoot(DatabaseService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
