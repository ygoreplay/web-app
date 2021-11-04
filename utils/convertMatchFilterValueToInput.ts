import { MatchListFilterFormValues } from "@forms/MatchListFilter";
import { MatchFilter } from "queries/index";

export function convertMatchFilterValueToInput(value: MatchListFilterFormValues): MatchFilter {
    return {
        ...value,
    };
}
