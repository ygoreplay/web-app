import { MatchDetailedQuery, MatchListItemFragment } from "queries/index";

export type Match = MatchListItemFragment;
export type MatchDetail = Exclude<MatchDetailedQuery["match"], null | undefined>;

export type DeckBase = Pick<MatchDetail["home"]["deck"], "side" | "main" | "extra" | "recognizedName">;
