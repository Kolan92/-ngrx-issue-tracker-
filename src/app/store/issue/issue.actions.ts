import {createAction, props} from "@ngrx/store";
import { Issue } from "./issue";

export const submit = createAction(
    "[Issue] Submit",
    props<{issue: Issue}>()
);