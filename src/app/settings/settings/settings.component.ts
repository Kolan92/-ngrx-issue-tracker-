import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/store';
import { SettingsRootState } from '../store/settings.state';
import * as fromSettings from '../store/settings.selectors';
import { changeNotificationPriority } from '../store/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  notificationPriority$!: Observable<Priority>;


  constructor(private store: Store<SettingsRootState>) {
    this.notificationPriority$ = store.select(fromSettings.selectNotificationPriority);
   }

  ngOnInit(): void {
  }

  changeNotificationPriority(notificationPriority: Priority) {
    this.store.dispatch(changeNotificationPriority({ notificationPriority }));
  }

}
