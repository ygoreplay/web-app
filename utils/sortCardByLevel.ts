/* eslint-disable no-bitwise */
interface Card {
    id: number;
    rawType: number;
    level: number;
    def: number;
    atk: number;
}

function compareCardByLevel(left: Card, right: Card) {
    if ((left.rawType & 0x7) !== (right.rawType & 0x7)) {
        return (left.rawType & 0x7) < (right.rawType & 0x7);
    }

    if ((left.rawType & 0x7) === 1) {
        const rawType1 = left.rawType & 0x48020c0 ? left.rawType & 0x48020c1 : left.rawType & 0x31;
        const rawType2 = right.rawType & 0x48020c0 ? right.rawType & 0x48020c1 : right.rawType & 0x31;
        if (rawType1 !== rawType2) {
            return rawType1 < rawType2;
        }

        if (left.level !== right.level) {
            return left.level > right.level;
        }

        if (left.atk !== right.atk) {
            return left.atk > right.atk;
        }

        if (left.def !== right.def) {
            return left.def > right.def;
        }

        return left.id < right.id;
    }

    if ((left.rawType & 0xfffffff8) !== (right.rawType & 0xfffffff8)) {
        return (left.rawType & 0xfffffff8) < (right.rawType & 0xfffffff8);
    }

    return left.id < right.id;
}

export function sortCardByLevel(left: Card, right: Card) {
    return compareCardByLevel(left, right) ? -1 : 1;
}
