import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './store/settings.reducer';
import { settingsFeatureKey } from './store/settings.state';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    StoreModule.forFeature(settingsFeatureKey, fromSettings.reducer),
  ]
})
export class SettingsModule { }
