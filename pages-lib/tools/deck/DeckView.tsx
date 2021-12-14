import React from "react";

import DeckViewList from "@routes/tools/deck/DeckViewList";
import { useDeckEditor } from "@routes/tools/deck/Context";

import { Root } from "./DeckView.styles";

export default function DeckView() {
    const { deck } = useDeckEditor();

    return (
        <Root>
            <DeckViewList type="main" cards={deck.main} />
            <DeckViewList type="extra" cards={deck.extra} />
            <DeckViewList type="side" cards={deck.side} />
        </Root>
    );
}
