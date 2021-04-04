import { createReducer, on } from "@ngrx/store";
import { initialState } from "./issue.state";
import * as IssueActions from "./issue.actions";
import { state } from "@angular/animations";

export const issueReducer = createReducer(
    initialState,
    on(IssueActions.submit, state => ({...state, loading: true})),
    on(IssueActions.submitSuccess, (state, { issue }) => {
        return {
            ...state,
            loading: false,
            entities: {
                ...state.entities,
                [issue.id]: {
                    ...issue,
                    resolved: false
                }
            }
        }
    }),
    on(IssueActions.submitFailure, (state, { error }) => ({...state, loading: false }))
);