import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { TextField, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";

import { InputContainer, Root } from "@routes/tools/deck/IndividualChampionshipForm.styles";
import { Footer, NextButton } from "@routes/tools/deck/ChampionshipSettingsForm.styles";

export interface IndividualChampionshipFormProps {
    onSubmit(value: IndividualChampionshipFormValues): void;
}
export interface IndividualChampionshipFormStates {}
export interface IndividualChampionshipFormValues {
    name: string;
}

class IndividualChampionshipForm extends React.Component<
    IndividualChampionshipFormProps & FormikProps<IndividualChampionshipFormValues>,
    IndividualChampionshipFormStates
> {
    public render() {
        const { handleChange, handleSubmit, handleBlur, touched, errors, isValid, isSubmitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Root>
                    <Typography variant="body1">대회 참가를 위한 덱 제출에 앞서 참가자 정보를 입력 해주셔야 합니다.</Typography>
                    <InputContainer>
                        <TextField
                            name="name"
                            type="text"
                            size="small"
                            label="참가자 이름"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            fullWidth
                            autoFocus
                            helperText={
                                touched.name && Boolean(errors.name)
                                    ? errors.name
                                    : "대회에 실제로 참가하는 참가자의 이름을 적어주세요. 참가자간 덱 구분을 위해 사용됩니다."
                            }
                        />
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

export default withFormik<IndividualChampionshipFormProps, IndividualChampionshipFormValues>({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,

    validationSchema: Yup.object().shape({
        name: Yup.string().required("참가자 이름을 입력해주세요."),
    }),

    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (values, { props: { onSubmit } }) => {
        await onSubmit(values);
    },
})(IndividualChampionshipForm);
