import * as _ from "lodash";

import React from "react";
import { List, AutoSizer, ListRowProps } from "react-virtualized";
import memoizeOne from "memoize-one";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";
import { AllCardsDocument, AllCardsProps, AllCardsQuery, AllCardsQueryVariables, withAllCards } from "@query";

import { Item, Root } from "@routes/tools/art/CardList.styles";

import { Rectangle } from "@utils/generateClipArea";

export interface CropperCardListUpdater {
    update(cardIds: number[]): Promise<void>;
}

export interface CropperCardListProps {
    unsavedSelectionData: { [key: number]: Rectangle | undefined };
    currentIndex: number;
    onChange(index: number): void;
    onUpdater(updater: CropperCardListUpdater): void;
}
export interface CropperCardListStates {
    cards: AllCardsQuery["cards"];
}

class CropperCardList extends React.Component<WithApolloClient<CropperCardListProps & AllCardsProps>, CropperCardListStates> {
    private list = React.createRef<List>();

    public state: CropperCardListStates = {
        cards: [],
    };

    public handleItemClick = memoizeOne((index: number) => {
        return () => {
            if (this.props.currentIndex === index) {
                return;
            }

            this.props.onChange(index);
        };
    });

    public componentDidMount() {
        this.props.onUpdater({
            update: this.updateCardList,
        });
    }
    public componentDidUpdate(prevProps: Readonly<CropperCardListProps & AllCardsProps>) {
        if (this.props.data.cards && !prevProps.data.cards && this.state.cards.length === 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                cards: this.props.data.cards,
            });
        }

        if (this.list.current) {
            if (this.props.currentIndex !== prevProps.currentIndex) {
                this.list.current.forceUpdateGrid();
            } else if (this.props.unsavedSelectionData !== prevProps.unsavedSelectionData) {
                this.list.current.forceUpdateGrid();
            }
        }
    }

    private updateCardList = async (cardIds: number[]) => {
        if (!this.list.current || !this.props.client) {
            return;
        }

        const { data } = await this.props.client.query<AllCardsQuery, AllCardsQueryVariables>({
            query: AllCardsDocument,
            variables: {
                ids: cardIds,
            },
        });

        this.list.current.forceUpdateGrid();
        this.setState((prevState: CropperCardListStates) => {
            const newCardMap = _.chain(data.cards).keyBy("id").mapValues().value();

            return {
                cards: prevState.cards.map(card => (newCardMap[card.id] ? newCardMap[card.id] : card)),
            };
        });
    };

    private renderNoRows = () => <div />;
    private renderRow = ({ key, index, style }: ListRowProps) => {
        const {
            data: { loading },
            currentIndex,
            unsavedSelectionData,
        } = this.props;
        const { cards } = this.state;
        if (loading || cards.length <= 0) {
            return <Item key={key} style={style} />;
        }

        return (
            <Item
                hasValue={cards[index].hasCropperItem}
                changed={Boolean(unsavedSelectionData[cards[index].id])}
                key={key}
                style={style}
                activated={currentIndex === index}
                onClick={this.handleItemClick(index)}
            >
                <span>{cards[index].text.name}</span>
            </Item>
        );
    };
    public render() {
        const {
            data: { loading },
        } = this.props;
        const { cards } = this.state;

        return (
            <Root>
                {!loading && cards.length > 0 && (
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                ref={this.list}
                                width={width}
                                height={height}
                                overscanColumnCount={50}
                                noRowsRenderer={this.renderNoRows}
                                rowCount={cards!.length}
                                rowHeight={48}
                                rowRenderer={this.renderRow}
                            />
                        )}
                    </AutoSizer>
                )}
            </Root>
        );
    }
}

export default withAllCards<CropperCardListProps>()(withApollo<CropperCardListProps & AllCardsProps>(CropperCardList));
