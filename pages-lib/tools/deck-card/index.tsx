import React from "react";
import memoizeOne from "memoize-one";
import _ from "lodash";

import { Fab, Zoom } from "@mui/material";
import { ChevronLeft, ChevronRight, Save } from "@mui/icons-material";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import CardList from "@routes/tools/deck-card/CardList";
import DeckCardSideBar from "@routes/tools/deck-card/DeckCardSideBar";

import { Content, DeckTitle, FabContainer, PrevNextButton, Root, TargetDeck } from "@routes/tools/deck-card/index.styles";

import { Placeholder } from "@styles/Placeholder";

import {
    DeckTitleCardInput,
    DeckTitleCardsDocument,
    DeckTitleCardsQuery,
    RegisterDeckTitleCardsDocument,
    RegisterDeckTitleCardsMutation,
    RegisterDeckTitleCardsMutationVariables,
} from "queries/index";
import { DeckTitleCard, DeckType } from "@utils/type";

export interface DeckCardToolRouteProps {
    deckTypes: DeckType[];
}
export interface DeckCardToolRouteStates {
    currentIndex: number;
    changedDeckTitleCards: DeckTitleCardInput[];
    deckTitleCards: _.Dictionary<DeckTitleCard>;
}

class DeckCardToolRoute extends React.Component<WithApolloClient<DeckCardToolRouteProps>, DeckCardToolRouteStates> {
    public state: DeckCardToolRouteStates = {
        currentIndex: 0,
        changedDeckTitleCards: [],
        deckTitleCards: {},
    };

    public async componentDidMount() {
        await this.refetchDeckTitleCards();
    }

    public handleMutateIndex = memoizeOne((delta: number) => {
        return () => {
            this.setState((prevState: DeckCardToolRouteStates) => ({
                currentIndex: prevState.currentIndex + delta,
            }));
        };
    });
    public handleChange = (index: number) => {
        this.setState({
            currentIndex: index,
        });
    };
    public handleCardChange = (cardId: number) => {
        this.setState((prevState: DeckCardToolRouteStates) => {
            const { deckTypes } = this.props;
            const currentType = deckTypes[prevState.currentIndex];

            return {
                changedDeckTitleCards: [
                    ...prevState.changedDeckTitleCards.filter(dtc => dtc.deckName !== currentType.name),
                    {
                        cardId,
                        deckName: currentType.name,
                    },
                ],
            };
        });
    };
    public handleSaveClick = async () => {
        if (!this.props.client) {
            return;
        }

        await this.props.client.mutate<RegisterDeckTitleCardsMutation, RegisterDeckTitleCardsMutationVariables>({
            mutation: RegisterDeckTitleCardsDocument,
            variables: {
                input: this.state.changedDeckTitleCards,
            },
        });

        await this.refetchDeckTitleCards();

        this.setState({
            changedDeckTitleCards: [],
        });
    };

    public refetchDeckTitleCards = async () => {
        if (!this.props.client) {
            return;
        }

        const { data } = await this.props.client.query<DeckTitleCardsQuery>({
            query: DeckTitleCardsDocument,
            fetchPolicy: "no-cache",
        });

        const deckTitleCards = _.chain(data.deckTitleCards).keyBy("name").mapValues().value();

        this.setState({
            deckTitleCards,
        });
    };

    public render() {
        const { deckTypes } = this.props;
        const { currentIndex, changedDeckTitleCards, deckTitleCards } = this.state;
        const currentType = deckTypes[currentIndex];
        const currentDeckTitleCardInput = changedDeckTitleCards.find(dtc => dtc.deckName === currentType.name);

        return (
            <Root>
                <Content>
                    <TargetDeck>
                        <PrevNextButton disabled={currentIndex === 0} onClick={this.handleMutateIndex(-1)}>
                            <ChevronLeft />
                        </PrevNextButton>
                        <Placeholder />
                        <DeckTitle>
                            <span>{currentType.name}</span>
                        </DeckTitle>
                        <Placeholder />
                        <PrevNextButton disabled={currentIndex + 1 === deckTypes.length} onClick={this.handleMutateIndex(1)}>
                            <ChevronRight />
                        </PrevNextButton>
                    </TargetDeck>
                    <CardList
                        currentTitleCard={currentDeckTitleCardInput || deckTitleCards[currentType.name]}
                        deckType={currentType}
                        onChange={this.handleCardChange}
                    />
                    <FabContainer>
                        <Zoom in={changedDeckTitleCards.length > 0} timeout={150} unmountOnExit>
                            <Fab color="primary" aria-label="save" onClick={this.handleSaveClick}>
                                <Save />
                            </Fab>
                        </Zoom>
                    </FabContainer>
                </Content>
                <DeckCardSideBar
                    deckTitleCards={deckTitleCards}
                    changedDeckTitleCards={changedDeckTitleCards}
                    deckTypes={deckTypes}
                    currentIndex={currentIndex}
                    onChange={this.handleChange}
                />
            </Root>
        );
    }
}

export default withApollo<DeckCardToolRouteProps>(DeckCardToolRoute);
