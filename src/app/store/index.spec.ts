// index.spec.ts
import { INIT } from "@ngrx/store";
import { reducers, RootState } from ".";
export const mockState = (override: Partial<RootState> = {}): RootState => {
    const initialState: {[key: string]: any} = {};
    Object.entries(reducers).forEach(([key, reducer]) => {
        initialState[key] = reducer(undefined, { type: INIT });
    });
    return {
        ...initialState,
        ...override,
    } as RootState;
};