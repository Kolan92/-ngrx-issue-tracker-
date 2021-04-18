import { createReducer, on } from "@ngrx/store";
import { initialState, Issues } from "./issue.state";
import * as IssueActions from "./issue.actions";

export const issueReducer = createReducer(
    initialState,
    on(IssueActions.submit, state => ({ ...state, loading: true })),
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
    on(IssueActions.submitFailure, (state, { error }) => ({ ...state, loading: false })),
    on(IssueActions.resolve, (state, { issueId }) => {
        const issue = state.entities[issueId];
        return {
            ...state,
            entities: {
                ...state.entities,
                [issueId]: {
                    ...issue,
                    resolved: true,
                }
            }
        };
    }),
    on(IssueActions.resolveFailure, (state, { issueId }) => {
        const issue = state.entities[issueId];
        return {
            ...state,
            entities: {
                ...state.entities,
                [issueId]: {
                    ...issue,
                    resolved: false,
                }
            }
        };
    }),
    on(IssueActions.loadSuccess, (state, {issues}) => {
        const entities: Issues = {};
        issues.forEach(issue => entities[issue.id] = issue);
        return {
            ...state,
            entities,
            loaded: true
        };
    }),
    on(IssueActions.loadFailure, (state, { error }) => {
        return {
            ...state, 
            loaded: true
        };
    })

);