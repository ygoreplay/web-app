import React from "react";
import memoizeOne from "memoize-one";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import { Global } from "@emotion/react";
import { Backdrop, Button, CircularProgress, CssBaseline } from "@mui/material";
import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { CHAMPIONSHIP_CREATION_PAGES } from "@routes/championship/constants";
import { BaseChampionshipDialogPageProps, ChampionshipCreationPageDefinition } from "@routes/championship/type";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";

import { Content, Dialog, Footer, GlobalStyles, Header, Progress, Root, Title } from "@routes/championship/index.styles";
import { Placeholder } from "@styles/Placeholder";

import { CreateChampionshipDocument, CreateChampionshipMutation, CreateChampionshipMutationVariables } from "@query";
import { CreateChampionshipResult } from "@utils/type";

export interface ChampionshipRouteProps {}
export interface ChampionshipRouteStates {
    currentIndex: number;
    validStatus: boolean[];
    submitting: boolean;
    createChampionshipResult: CreateChampionshipResult | null;
}

class ChampionshipRoute extends React.Component<WithApolloClient<ChampionshipRouteProps> & WithChampionshipCreationDataProps, ChampionshipRouteStates> {
    private swiper: SwiperClass | null = null;
    public state: ChampionshipRouteStates = {
        currentIndex: 0,
        validStatus: CHAMPIONSHIP_CREATION_PAGES.map(() => false),
        submitting: false,
        createChampionshipResult: null,
    };

    private handleSwiper = (swiper: SwiperClass) => {
        this.swiper = swiper;
    };
    private handleValidStateChange = memoizeOne((index: number) => {
        return (isValid: boolean) => {
            this.setState((prevState: ChampionshipRouteStates) => ({
                validStatus: prevState.validStatus.map((valid, i) => (i === index ? isValid : valid)),
            }));
        };
    });
    private handleHeightChange = () => {
        if (!this.swiper) {
            return;
        }

        this.swiper.update();
        this.swiper.updateSize();
    };
    private handleSlideChange = (swiper: SwiperClass) => {
        this.setState({
            currentIndex: swiper.realIndex,
        });
    };
    private handleNextClick = () => {
        if (!this.swiper) {
            return;
        }

        this.swiper.slideNext();
    };
    private handlePrevClick = () => {
        if (!this.swiper) {
            return;
        }

        this.swiper.slidePrev();
    };
    private handleSubmit = async () => {
        const { client, creationValues } = this.props;
        if (!this.swiper || !client || !creationValues) {
            return;
        }

        this.setState({ submitting: true });

        try {
            const { data } = await client.mutate<CreateChampionshipMutation, CreateChampionshipMutationVariables>({
                mutation: CreateChampionshipDocument,
                variables: {
                    data: {
                        type: creationValues.type,
                        title: creationValues.championshipName,
                        shareCardCount: creationValues.shareCardCount,
                        banList: creationValues.banList,
                        shareBanLists: creationValues.shareBanList,
                    },
                },
            });

            if (!data) {
                this.setState({ submitting: false });
                return;
            }

            this.setState({ submitting: false, createChampionshipResult: data.createChampionship });
            this.swiper.slideNext();
        } catch {
            this.setState({ submitting: false });
        }
    };

    private renderPage = (Page: React.ComponentType<BaseChampionshipDialogPageProps> | ChampionshipCreationPageDefinition, index: number) => {
        const { currentIndex, createChampionshipResult } = this.state;
        let Component: React.ComponentType<BaseChampionshipDialogPageProps>;
        if ("component" in Page) {
            Component = Page.component;
        } else {
            Component = Page;
        }

        return (
            <SwiperSlide key={index}>
                <Component
                    result={createChampionshipResult}
                    activated={index === currentIndex}
                    onValidStateChange={this.handleValidStateChange(index)}
                    onHeightChange={this.handleHeightChange}
                    index={index}
                />
            </SwiperSlide>
        );
    };
    public render() {
        const { currentIndex, validStatus, submitting } = this.state;
        const currentPage = CHAMPIONSHIP_CREATION_PAGES[currentIndex];
        let submitButtonName: string = "다음";
        let titleContent: string = "대회 개최";
        let isSubmit: boolean = false;
        let isComplete: boolean = false;
        if ("component" in currentPage) {
            if (currentPage.submitButtonName) {
                submitButtonName = currentPage.submitButtonName;
            }

            if (currentPage.titleName) {
                titleContent = currentPage.titleName;
            }

            if (typeof currentPage.submit !== "undefined") {
                isSubmit = currentPage.submit;
            }

            if (currentPage.complete) {
                isComplete = currentPage.complete;
            }
        }

        return (
            <Root>
                <CssBaseline />
                <Global styles={GlobalStyles} />
                <Dialog>
                    <Header>
                        <Title variant="h6">{titleContent}</Title>
                    </Header>
                    <Content>
                        <Progress
                            style={{
                                width: `${(currentIndex / (CHAMPIONSHIP_CREATION_PAGES.length - 2)) * 100}%`,
                                display: currentIndex === CHAMPIONSHIP_CREATION_PAGES.length - 1 ? "none" : "block",
                            }}
                        />
                        <Swiper onSwiper={this.handleSwiper} onSlideChange={this.handleSlideChange} autoHeight noSwiping noSwipingClass="swiper-slide">
                            {CHAMPIONSHIP_CREATION_PAGES.map(this.renderPage)}
                        </Swiper>
                    </Content>
                    <Footer>
                        <Button disabled={currentIndex === 0 || isComplete} onClick={this.handlePrevClick}>
                            이전
                        </Button>
                        <Placeholder />
                        <Button
                            disabled={!validStatus[currentIndex]}
                            variant="contained"
                            disableElevation
                            onClick={isSubmit ? this.handleSubmit : this.handleNextClick}
                        >
                            {submitButtonName}
                        </Button>
                    </Footer>
                </Dialog>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={submitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Root>
        );
    }
}

export default withApollo(withChampionshipCreationData(ChampionshipRoute));
