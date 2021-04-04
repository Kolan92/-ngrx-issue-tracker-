import { createReducer, on } from "@ngrx/store";
import { initialState } from "./issue.state";
import * as IssueActions from "./issue.actions";

export const issueReducer = createReducer(
    initialState,
    on(IssueActions.submit, (state, { issue }) => {
        return {
            ...state,
            entities: {
                ...state.entities,
                [issue.id]: {
                    ...issue,
                    resolved: false
                }
            }
        }
    })
);