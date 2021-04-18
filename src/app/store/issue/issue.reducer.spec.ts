import { issueReducer } from './issue.reducer';
import { initialState, IssueState, Issues } from "./issue.state";
import { INIT } from '@ngrx/store';
import * as issueActions from './issue.actions';
import { IssueFactory } from './issue.factory.spec';

describe('Issue Reducers', () => {
    let factory: IssueFactory;

    beforeEach(() => {
        factory = new IssueFactory();
    });

    describe("init action", () => {
        it("should return the initial state", () => {
            const nextState = issueReducer(undefined, { type: INIT });
            expect(nextState).toBe(initialState);
        });
    });

    describe("unknown action", () => {
        it("should return the previous state", () => {
            const nextState = issueReducer(initialState, {} as any);
            expect(nextState).toBe(initialState);
        });
    });

    describe('resolve', () => {
        it('should resolve issue', () => {
            const issueId = 'my-issue';

            const issue = factory.entity();
            const state = factory.state({
                entities: factory.entities(issue)
            })

            const nextState = issueReducer(state, issueActions.resolve({ issueId }));
            expect(nextState.entities[issueId].resolved).toBeTrue();
        });
    });

})
