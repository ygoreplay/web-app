import { ParticipantData } from "@routes/championship/submit/types";

export function checkIfParticipantDataIsValid(participants: ParticipantData[]) {
    return !participants.some(p => !p.name || !p.deckFile);
}
