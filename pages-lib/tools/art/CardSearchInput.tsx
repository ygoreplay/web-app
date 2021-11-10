import * as _ from "lodash";
import React from "react";

import { Autocomplete, InputAdornment, AutocompleteRenderInputParams, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";

import { Root } from "@routes/tools/art/CardSearchInput.styles";

import { CardSuggestionData } from "@utils/type";
import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";
import { CardSuggestionsDocument, CardSuggestionsQuery, CardSuggestionsQueryVariables } from "queries/index";

export interface CardSearchInputProps {
    onSubmit(card: CardSuggestionData): void;
}
export interface CardSearchInputStates {
    open: boolean;
    options: CardSuggestionData[];
    value: CardSuggestionData | null;
    inputValue: string;
    loading: boolean;
}

class CardSearchInput extends React.Component<WithApolloClient<CardSearchInputProps>, CardSearchInputStates> {
    public state: CardSearchInputStates = {
        open: false,
        options: [],
        value: null,
        inputValue: "",
        loading: false,
    };
    private unmounted: boolean = false;

    public doFetch = _.throttle((query: string, callback: (data: CardSuggestionData[]) => void) => {
        if (!this.props.client) {
            return;
        }

        this.setState({ loading: true });
        this.props.client
            .query<CardSuggestionsQuery, CardSuggestionsQueryVariables>({
                query: CardSuggestionsDocument,
                variables: {
                    query,
                    count: 15,
                },
            })
            .then(data => {
                this.setState({ loading: false });
                callback(data.data.cardSuggestions);
            });
    }, 200);

    public componentDidMount() {
        this.unmounted = false;
    }
    public componentDidUpdate(prevProps: Readonly<WithApolloClient<CardSearchInputProps>>, prevState: Readonly<CardSearchInputStates>) {
        const { value, inputValue } = this.state;
        if (value !== prevState.value || inputValue !== prevState.inputValue) {
            this.handleRefresh();
        }
    }
    public componentWillUnmount() {
        this.unmounted = true;
    }

    public filterOptions = (item: CardSuggestionData[]) => item;
    public getOptionLabel = (item: CardSuggestionData) => `${item.name} (${item.id})`;

    public handleOpen = () => {
        this.setState({ open: true });
    };
    public handleClose = () => {
        this.setState({ open: false });
    };
    public handleRefresh = () => {
        const { inputValue, value } = this.state;
        if (!inputValue) {
            this.setState({
                options: value ? [value] : [],
            });
            return;
        }

        this.doFetch(inputValue, data => {
            if (this.unmounted) {
                return;
            }

            let newOptions: CardSuggestionData[] = [];
            if (value) {
                newOptions = [value];
            }

            if (data) {
                newOptions = [...newOptions, ...data];
            }

            this.setState({
                options: newOptions,
            });
        });
    };
    public handleChange = (event: React.SyntheticEvent, newValue: CardSuggestionData | null) => {
        this.setState((prevState: CardSearchInputStates) => ({
            options: newValue ? [newValue, ...prevState.options] : prevState.options,
            value: newValue,
        }));
    };
    public handleInputChange = (__: any, newInputValue: string) => {
        this.setState({
            inputValue: newInputValue,
        });
    };
    public handleKeyDown = () => {
        const { value } = this.state;
        if (!value) {
            return;
        }

        this.props.onSubmit(value);
        this.setState({
            value: null,
            open: false,
            inputValue: "",
            options: [],
        });
    };

    private renderInput = (params: AutocompleteRenderInputParams) => {
        const { loading } = this.state;

        return (
            <Root
                {...params}
                variant="outlined"
                size="small"
                placeholder="카드 검색"
                fullWidth
                onKeyDown={this.handleKeyDown}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: loading ? <CircularProgress color="primary" size={20} /> : null,
                }}
            />
        );
    };

    public render() {
        const { open, options, value } = this.state;

        return (
            <Autocomplete<CardSuggestionData>
                value={value}
                includeInputInList
                filterSelectedOptions
                noOptionsText="일치하는 항목 없음"
                filterOptions={this.filterOptions}
                getOptionLabel={this.getOptionLabel}
                options={options}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                open={open}
                renderInput={this.renderInput}
            />
        );
    }
}

export default withApollo<CardSearchInputProps>(CardSearchInput);
