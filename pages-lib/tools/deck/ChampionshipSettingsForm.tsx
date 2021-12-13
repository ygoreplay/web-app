/* eslint-disable no-restricted-globals,react/jsx-curly-brace-presence */
import React from "react";
import { FormikProps, withFormik } from "formik";

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";

import { CHAMPIONSHIP_FORM_VALIDATION_SCHEMA, FORM_STEPS, StepId } from "@routes/tools/deck/constants";

import { Content, Footer, NextButton, Root, Title, UrlBlock } from "./ChampionshipSettingsForm.styles";

import { CreateChampionshipResult } from "@query";

export type ChampionshipType = "team" | "individual";

export interface ChampionshipSettingsFormProps {
    banLists: string[];
    onSubmit(values: ChampionshipSettingsFormValues): Promise<CreateChampionshipResult>;
}
export interface ChampionshipSettingsFormStates {
    currentStep: StepId;
    joinToken: CreateChampionshipResult | null;
}
export interface ChampionshipSettingsFormValues {
    title: string;
    type: ChampionshipType;
    banList: string;
    shareCardCount: boolean;
    shareBanLists: boolean;
}

class ChampionshipSettingsForm extends React.Component<
    FormikProps<ChampionshipSettingsFormValues> & ChampionshipSettingsFormProps,
    ChampionshipSettingsFormStates
> {
    private contentRenderer: { [type in StepId]: () => React.ReactNode } = {
        title: this.renderTitleContent.bind(this),
        type: this.renderTypeContent.bind(this),
        banList: this.renderBanListContent.bind(this),
        options: this.renderOptionsContent.bind(this),
    };

    public state: ChampionshipSettingsFormStates = {
        currentStep: "title",
        joinToken: { joinUrl: "LNwzhC0AgEIcPigL", monitorUrl: "KR6jkMWm8sK45Wdd", __typename: "CreateChampionshipResult" },
    };

    private handleClick = async () => {
        const { currentStep } = this.state;
        const stepIndex = FORM_STEPS.findIndex(step => step.id === currentStep);
        if (stepIndex === -1) {
            throw new Error(`Unknown step is given: ${stepIndex}`);
        }

        if (stepIndex + 1 === FORM_STEPS.length) {
            try {
                CHAMPIONSHIP_FORM_VALIDATION_SCHEMA.validateSync(this.props.values);
            } catch (e) {
                // TODO: Handle this.
            }

            this.setState({
                joinToken: await this.props.onSubmit(this.props.values),
            });

            return;
        }

        this.setState({
            currentStep: FORM_STEPS[stepIndex + 1].id,
        });
    };
    private handleTypeChange = (_: any, value: string) => {
        this.props.setFieldValue("type", value);
    };

    private renderTitleContent() {
        const { values, handleChange, handleBlur } = this.props;

        return <TextField name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} type="text" fullWidth placeholder="이름 입력..." />;
    }
    private renderTypeContent() {
        const { values } = this.props;

        return (
            <RadioGroup aria-label="대회 진행 방식" value={values.type} onChange={this.handleTypeChange} name="radio-buttons-group">
                <FormControlLabel value="individual" control={<Radio />} label="개인전" />
                <FormControlLabel value="team" control={<Radio />} label="팀전" />
            </RadioGroup>
        );
    }

    private renderBanListItem = (banListTitle: string) => {
        return (
            <MenuItem key={banListTitle} value={banListTitle}>
                {banListTitle}
            </MenuItem>
        );
    };
    private renderBanListContent() {
        const { banLists, handleChange, handleBlur } = this.props;

        return (
            <FormControl fullWidth>
                <InputLabel id="banlist-label">적용 금제 선택</InputLabel>
                <Select fullWidth labelId="banlist-label" name="banList" onChange={handleChange} onBlur={handleBlur} label="적용 금제 선택">
                    {banLists.map(this.renderBanListItem)}
                </Select>
            </FormControl>
        );
    }
    private renderOptionsContent() {
        const { values, handleChange } = this.props;

        return (
            <>
                <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={values.shareCardCount} onChange={handleChange} name="shareCardCount" />}
                            label="카드 매 수 공유"
                        />
                    </FormGroup>
                    <FormHelperText>
                        카드 매 수를 공유하게 되면 모든 팀원의 덱을 합쳐서 한 카드의 매 수가 3매를 넘을 수 없게 됩니다.
                        <br />
                        (금제는 고려 안함)
                    </FormHelperText>
                </FormControl>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={values.shareBanLists} onChange={handleChange} name="shareBanLists" />}
                            label="금제 공유"
                        />
                    </FormGroup>
                    <FormHelperText>금제 공유시 팀원의 덱을 모두 합쳐서 금제 부합 여부를 판단하게 됩니다</FormHelperText>
                </FormControl>
            </>
        );
    }

    public render() {
        const { currentStep, joinToken } = this.state;
        if (joinToken) {
            return (
                <>
                    <Title>
                        <Typography variant="h6">대회 개설 완료</Typography>
                    </Title>
                    <Root>
                        <Typography variant="body1">대회 개설을 성공 하였습니다! 참가자를 모집하기 위해 다음 URL을 참가자들에게 알려주세요:</Typography>
                        <UrlBlock>
                            {location.protocol}
                            {"//"}
                            {location.host}/tools/deck/{joinToken.joinUrl}
                        </UrlBlock>
                        <Typography variant="body1">실시간 참가자 덱 모니터링과 같은 덱 접수 관리는 다음과 같은 URL에서 확인 하실 수 있습니다:</Typography>
                        <UrlBlock>
                            {location.protocol}
                            {"//"}
                            {location.host}/tools/deck/{joinToken.monitorUrl}
                        </UrlBlock>
                    </Root>
                    <Footer>
                        <NextButton>
                            <span>확인</span>
                        </NextButton>
                    </Footer>
                </>
            );
        }

        const currentStepItem = FORM_STEPS.find(step => step.id === currentStep);
        if (!currentStepItem) {
            throw new Error(`Unknown step data with id: ${currentStep}`);
        }

        const valid = currentStepItem.validate(this.props.values);
        const currentStepIndex = FORM_STEPS.findIndex(step => step === currentStepItem);

        return (
            <>
                <Title>
                    <Typography variant="h6">{currentStepItem.title}</Typography>
                </Title>
                <Root>
                    <Typography variant="body1">{currentStepItem.description}</Typography>
                    <Content>{this.contentRenderer[currentStepItem.id]()}</Content>
                </Root>
                <Footer>
                    <NextButton onClick={this.handleClick} disabled={!valid} focusRipple>
                        <span>{currentStepIndex + 1 === FORM_STEPS.length ? "완료" : "다음"}</span>
                        <ArrowRightIcon />
                    </NextButton>
                </Footer>
            </>
        );
    }
}

export default withFormik<ChampionshipSettingsFormProps, ChampionshipSettingsFormValues>({
    mapPropsToValues: () => ({ title: "", type: "individual", banList: "", shareCardCount: false, shareBanLists: false }),
    handleSubmit: () => {},
})(ChampionshipSettingsForm);
