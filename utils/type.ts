import {
    BanListQuery,
    CardSuggestionsQuery,
    ChampionshipQuery,
    DeckTypesQuery,
    HomeDataQuery,
    MatchDetailedQuery,
    MatchListItemFragment,
    NormalDeckTitleCardFragment,
} from "queries/index";

export type Match = MatchListItemFragment;
export type MatchDetail = Exclude<MatchDetailedQuery["match"], null | undefined>;
export type CardUsageData = HomeDataQuery["topUsageCards"][0];
export type DeckUsageData = HomeDataQuery["topUsageDecks"][0];
export type CardSuggestionData = CardSuggestionsQuery["cardSuggestions"][0];
export type DeckType = DeckTypesQuery["deckTypes"][0];
export type DeckTitleCard = NormalDeckTitleCardFragment;
export type Championship = Exclude<ChampionshipQuery["championship"], null | undefined>;
export type BanList = BanListQuery["banList"];

export type DeckBase = Pick<MatchDetail["home"]["deck"], "side" | "main" | "extra" | "recognizedName">;
