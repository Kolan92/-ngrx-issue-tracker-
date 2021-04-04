import { createAction, props } from "@ngrx/store";
import { Priority } from "../../store";

export const changeNotificationPriority = createAction(
  "[Settings] Change Notification Priority",
  props<{ notificationPriority: Priority }>()
);