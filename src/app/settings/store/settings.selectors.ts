import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsRootState, SettingsState } from "./settings.state";

export const selectFeature = createFeatureSelector<SettingsRootState, SettingsState>(settingsFeatureKey);

export const selectNotificationPriority = createSelector(
  selectFeature,
  settings => settings.notificationPriority
)
