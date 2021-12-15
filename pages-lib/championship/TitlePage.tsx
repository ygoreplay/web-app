import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { TextField, Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { InputWrapper, Root } from "@routes/championship/TitlePage.styles";

export interface TitlePageProps extends BaseChampionshipDialogPageProps {}
export interface TitlePageStates {}

export interface TitlePageValues {
    championshipName: string;
}

class TitlePage extends React.Component<TitlePageProps & FormikProps<TitlePageValues> & WithChampionshipCreationDataProps, TitlePageStates> {
    public componentDidUpdate(prevProps: Readonly<TitlePageProps & FormikProps<TitlePageValues>>) {
        if (prevProps.values.championshipName !== this.props.values.championshipName) {
            this.props.setValue("championshipName", this.props.values.championshipName);
        }
    }

    public render() {
        const { index, activated, onValidStateChange, isValid, onHeightChange, handleChange, handleBlur, values, touched, errors } = this.props;

        return (
            <DialogPage activated={activated} index={index} onValidStateChange={onValidStateChange} isValid={isValid} onHeightChange={onHeightChange}>
                <Root>
                    <Typography variant="body1">진행할 대회 이름을 입력해주세요. 해당 이름은 모든 참가자에게 공개됩니다.</Typography>
                    <InputWrapper>
                        <TextField
                            disabled={!activated}
                            fullWidth
                            size="small"
                            label="대회 이름"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.championshipName}
                            name="championshipName"
                            error={touched.championshipName && Boolean(errors.championshipName)}
                            helperText={touched.championshipName && errors.championshipName ? errors.championshipName : ""}
                        />
                    </InputWrapper>
                </Root>
            </DialogPage>
        );
    }
}

export default withFormik<TitlePageProps, TitlePageValues>({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,

    mapPropsToValues: () => ({ championshipName: "" }),
    handleSubmit: () => {},

    validationSchema: Yup.object().shape({
        championshipName: Yup.string().required("대회 이름을 입력해주세요."),
    }),
})(withChampionshipCreationData(TitlePage));
