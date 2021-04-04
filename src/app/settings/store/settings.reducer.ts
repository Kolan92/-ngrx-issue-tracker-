import { createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';
import {initialState} from './settings.state';

export const reducer = createReducer(
  initialState,

  on(SettingsActions.changeNotificationPriority, (state, {notificationPriority}) => ({
    ...state,
    notificationPriority
  })),
);

