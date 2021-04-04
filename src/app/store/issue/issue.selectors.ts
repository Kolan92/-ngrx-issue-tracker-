import { createSelector, select } from "@ngrx/store";
import { pipe } from "rxjs";
import { skipWhile } from "rxjs/operators";
import { RootState } from "..";
import { Issue } from "./issue";
import { Filter, Issues } from "./issue.state";

export const selectFeature = (state: RootState) => state.issue;

export const selectEntities = createSelector(
    selectFeature,
    (featureState) => featureState.entities
);

export const selectAll = createSelector(
    selectEntities,
    (entities) => Object.values(entities)
);

export const selectAllLoaded = () =>
    pipe(
        skipWhile((state: RootState) => !selectLoaded),
        select(selectAll)
    );

export const selectFilter = createSelector(
    selectFeature,
    (featureState) => featureState.filter
);

export const selectedFiltered = createSelector(
    selectAll,
    selectFilter,
    (issues: Issue[], filter: Filter) => {
        if (!filter.text) {
            return issues;
        }
        const filterLowercased = filter.text.toLowerCase();
        return issues.filter(issue =>
            issue.title.toLowerCase().includes(filterLowercased) ||
            issue.description.toLowerCase().includes(filterLowercased))
    }
);

export interface IssueStats {
    total: number;
    resolved: number;
}

export const selectStats = createSelector(
    selectAll,
    (issues): IssueStats => {
        const resolved = issues.filter((issue) => issue.resolved);
        return {
            total: issues.length,
            resolved: resolved.length,
        };
    }
);

export const selectById = createSelector(
    selectEntities,
    (entities: Issues, id: string) => entities[id]
);


export const selectLoaded = createSelector(
    selectFeature,
    (feature) => feature.loaded
)