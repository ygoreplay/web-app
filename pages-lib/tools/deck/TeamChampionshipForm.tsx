import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";

import { InputContainer, InputWrapper, Root } from "@routes/tools/deck/IndividualChampionshipForm.styles";
import { Footer, NextButton } from "@routes/tools/deck/ChampionshipSettingsForm.styles";

export interface TeamChampionshipFormProps {
    onSubmit(value: TeamChampionshipFormValues): void;
}
export interface TeamChampionshipFormStates {}
export interface TeamChampionshipFormValues {
    name: string;
    firstParticipantName: string;
    secondParticipantName: string;
    thirdParticipantName: string;
}

class TeamChampionshipForm extends React.Component<TeamChampionshipFormProps & FormikProps<TeamChampionshipFormValues>, TeamChampionshipFormStates> {
    private renderTextField = (name: keyof TeamChampionshipFormValues, label: string, helperText: string, autoFocus?: boolean) => {
        const { values, touched, errors, handleChange, handleBlur } = this.props;

        return (
            <InputWrapper>
                <TextField
                    name={name}
                    type="text"
                    size="small"
                    label={label}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[name] && Boolean(errors[name])}
                    fullWidth
                    autoFocus={autoFocus}
                    helperText={touched[name] && Boolean(errors[name]) ? errors[name] : helperText}
                />
            </InputWrapper>
        );
    };

    public render() {
        const { handleSubmit, isValid, isSubmitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Root>
                    <Typography variant="body1">대회 참가를 위한 덱 제출에 앞서 참가 팀의 정보를 입력 해주셔야 합니다.</Typography>
                    <InputContainer>
                        {this.renderTextField(
                            "name",
                            "참가 팀 이름",
                            "대회에 실제로 참가하는 팀의 이름을 입력 해주세요. 팀간 덱 구분을 위해 사용됩니다.",
                            true,
                        )}
                        {this.renderTextField("firstParticipantName", "첫 번째 팀원 이름", "첫 번째 참가자의 이름을 입력해주세요.")}
                        {this.renderTextField("secondParticipantName", "두 번째 팀원 이름", "두 번째 참가자의 이름을 입력해주세요.")}
                        {this.renderTextField("thirdParticipantName", "세 번째 팀원 이름", "세 번째 참가자의 이름을 입력해주세요.")}
                    </InputContainer>
                </Root>
                <Footer>
                    <NextButton type="submit" disabled={!isValid || isSubmitting}>
                        <span>제출</span>
                        <ArrowRightIcon />
                    </NextButton>
                </Footer>
            </form>
        );
    }
}

export default withFormik<TeamChampionshipFormProps, TeamChampionshipFormValues>({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,

    validationSchema: Yup.object().shape({
        name: Yup.string().required("참가자 이름을 입력해주세요."),
        firstParticipantName: Yup.string().required("첫 번째 참가자의 이름을 입력해주세요."),
        secondParticipantName: Yup.string().required("두 번째 참가자의 이름을 입력해주세요."),
        thirdParticipantName: Yup.string().required("세 번째 참가자의 이름을 입력해주세요."),
    }),

    mapPropsToValues: () => ({ name: "", firstParticipantName: "", secondParticipantName: "", thirdParticipantName: "" }),
    handleSubmit: async (values, { props: { onSubmit } }) => {
        await onSubmit(values);
    },
})(TeamChampionshipForm);
