import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'issues' },
  { path: 'issues', component: IssuesComponent },
  { path: 'issues/:id', component: IssueDetailsComponent },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) => m.SettingsModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
