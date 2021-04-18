import { RootState } from "..";
import { mockState } from "../index.spec";
import { IssueFactory } from "./issue.factory.spec";
import { selectFeature, selectedFiltered, selectById } from "./issue.selectors";
import { initialState } from "./issue.state";

describe("selectFeature", () => {
    let factory: IssueFactory;

    beforeEach(() => {
        factory = new IssueFactory();
    });

    it('should select feature state', () => {
        const issueState = factory.state({
            entities: factory.entities(factory.entity(), factory.entity())
        });

        const rootState = mockState({
            issue: issueState
        });

        expect(selectFeature(rootState)).toBe(issueState);
    });

    it("should filter issues for non-empty filter", () => {
        const first = factory.entity({
            title: "First",
            description: "This is a Test",
        });
        const second = factory.entity({
            title: "Second",
            description: "This is a Test",
        });

        let filtered = selectedFiltered.projector([first, second], {
            text: "First",
        });
        expect(filtered).toEqual([first]);

        filtered = selectedFiltered.projector([first, second], {
            text: "test",
        });
        expect(filtered).toEqual([first, second]);
    });

    it('should select issue by id', () => {
        const first = factory.entity();
        const second = factory.entity();

        const entities = factory.entities(first, second);

        const selected = selectById.projector(entities, first.id);

        expect(selected).toBe(first);
    });

    describe("Issue Selectors", () => {
        
    });
});