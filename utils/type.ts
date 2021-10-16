import { MatchDetailedQuery, MatchesQuery } from "queries/index";

export type Match = MatchesQuery["matches"][0];
export type MatchDetail = Exclude<MatchDetailedQuery["match"], null | undefined>;

export type DeckBase = Pick<MatchDetail["home"]["deck"], "side" | "main" | "extra" | "recognizedName">;
