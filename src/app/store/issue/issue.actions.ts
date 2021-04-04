import {createAction, props} from "@ngrx/store";
import { Issue } from "./issue";

export const submit = createAction(
    "[Issue] Submit",
    props<{issue: Issue}>()
);

export const submitSuccess = createAction(
    "[Issue] Submit success",
    props<{issue: Issue}>()
);


export const submitFailure = createAction(
    "[Issue] Submit failure",
    props<{error: any}>()
);