import { Card } from "@routes/tools/deck";

export interface Deck {
    main: Card[];
    extra: Card[];
    side: Card[];
}

export type BanListStatus = "forbidden" | "limit" | "semi-limit";
export type ParticipantType = "first" | "second" | "third";
export type TeamDeck = { [type in ParticipantType]: Deck };
