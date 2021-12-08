import { CardAttribute, CardRace, TrapSpellCardType } from "@query";

export const CardAttributeNames: { [key in CardAttribute]: string } = {
    [CardAttribute.None]: "알 수 없음",
    [CardAttribute.Dark]: "어둠",
    [CardAttribute.Divine]: "신",
    [CardAttribute.Earth]: "땅",
    [CardAttribute.Fire]: "화염",
    [CardAttribute.Water]: "물",
    [CardAttribute.Light]: "빛",
    [CardAttribute.Wind]: "바람",
};

export const CardRaceNames: { [key in CardRace]: string } = {
    [CardRace.None]: "알 수 없음",
    [CardRace.Insect]: "곤충족",
    [CardRace.Dinosaur]: "공룡족",
    [CardRace.Machine]: "기계족",
    [CardRace.SpellCaster]: "마법사족",
    [CardRace.Aqua]: "물족",
    [CardRace.Beast]: "야수족",
    [CardRace.BeastWarrior]: "야수전사족",
    [CardRace.CreatorGod]: "창조신족",
    [CardRace.Cybers]: "사이버스족",
    [CardRace.Divine]: "환신야수족",
    [CardRace.Dragon]: "드래곤족",
    [CardRace.Fairy]: "천사족",
    [CardRace.Fiend]: "악마족",
    [CardRace.Fish]: "어류족",
    [CardRace.Plant]: "식물족",
    [CardRace.Psycho]: "사이킥족",
    [CardRace.Pyro]: "화염족",
    [CardRace.Reptile]: "파충류족",
    [CardRace.Rock]: "암석족",
    [CardRace.SeaSerpent]: "해룡족",
    [CardRace.Thunder]: "번개족",
    [CardRace.Warrior]: "전사족",
    [CardRace.WindBeast]: "비행야수족",
    [CardRace.Wyrm]: "웜족",
    [CardRace.Zombie]: "언데드족",
};

export const TrapSpellCardTypeNames: { [key in TrapSpellCardType]: string } = {
    [TrapSpellCardType.Normal]: "일반",
    [TrapSpellCardType.Continuous]: "지속",
    [TrapSpellCardType.Counter]: "카운터",
    [TrapSpellCardType.Equip]: "장착",
    [TrapSpellCardType.Field]: "필드",
    [TrapSpellCardType.QuickPlay]: "속공",
    [TrapSpellCardType.Ritual]: "의식",
};
