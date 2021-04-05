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

export const resolve = createAction(
    "[Issue] Resolve",
    props<{issueId: string}>()
);

export const resolveFailure = createAction(
    "[Issue] Resolve failure",
    props<{issueId: string, error: any}>()
);

export const resolveSuccess = createAction(
    "[Issue] Resolve success"
);

export const load = createAction("[Issue] load");

export const loadSuccess = createAction(
    "[Issue] load success",
    props<{issues: Issue[]}>()
);

export const loadFailure = createAction(
    "[Issue] load failure",
    props<{error: any}>()
);