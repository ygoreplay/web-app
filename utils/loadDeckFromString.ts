/* eslint-disable no-restricted-syntax,no-continue */
import { Card } from "@routes/tools/deck";
import { Deck } from "@routes/tools/deck/types";

const YDK_FILE_VALIDATORS = [/!side/];

export function loadDeckFromString(fileContent: string, cards: Card[]): Deck {
    const isValidFile = !YDK_FILE_VALIDATORS.some(regex => !regex.test(fileContent));
    if (!isValidFile) {
        throw new Error("This is not valid ydk file!");
    }

    const result: Deck = { main: [], side: [], extra: [] };
    const lines = fileContent
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map(line => line.trim().replace(/#.*?$/g, ""))
        .filter(line => Boolean(line.trim()));

    let sideStarted = false;
    for (const line of lines) {
        if (line.startsWith("!side")) {
            sideStarted = true;
            continue;
        }

        const id = parseInt(line, 10);
        const card = cards.find(c => c.id === id);
        if (!card) {
            throw new Error(`Failed to find card with id: ${id}`);
        }

        if (sideStarted) {
            result.side.push(card);
            continue;
        }

        if (card.isExtra) {
            result.extra.push(card);
        } else {
            result.main.push(card);
        }
    }

    return result;
}
