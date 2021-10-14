import { MatchDetailedQuery, MatchesQuery } from "queries/index";

export type Match = MatchesQuery["matches"][0];
export type MatchDetail = Exclude<MatchDetailedQuery["match"], null | undefined>;

export type DeckBase = Pick<MatchDetail["rounds"][0]["playerDecks"][0]["deck"], "side" | "main" | "extra" | "recognizedName">;
