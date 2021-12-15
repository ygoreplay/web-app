import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { Root } from "@routes/championship/TitlePage.styles";

import { ChampionshipType } from "@query";

export interface TypePageProps extends BaseChampionshipDialogPageProps {}
export interface TypePageStates {}
export interface TypePageValues {
    type: ChampionshipType;
}

class TypePage extends React.Component<TypePageProps & FormikProps<TypePageValues> & WithChampionshipCreationDataProps, TypePageStates> {
    public componentDidUpdate(prevProps: Readonly<TypePageProps & FormikProps<TypePageValues>>) {
        if (prevProps.values.type !== this.props.values.type) {
            this.props.setValue("type", this.props.values.type);
        }
    }

    public render() {
        const { index, activated, onValidStateChange, isValid, onHeightChange, handleChange, handleBlur, values } = this.props;

        return (
            <DialogPage activated={activated} index={index} onValidStateChange={onValidStateChange} isValid={isValid} onHeightChange={onHeightChange}>
                <Root>
                    <Typography variant="body1">대회가 진행되는 형식을 선택해주세요. 팀전의 경우 덱 제출시 덱 3개를 한번에 제출하게 됩니다.</Typography>
                    <FormControl sx={{ mt: 2 }} component="fieldset">
                        <RadioGroup aria-label="진행 형식" name="type" onChange={handleChange} onBlur={handleBlur} value={values.type}>
                            <FormControlLabel value={ChampionshipType.Individual} control={<Radio disabled={!activated} />} label="개인전" />
                            <FormControlLabel value={ChampionshipType.Team} control={<Radio disabled={!activated} />} label="팀전" />
                        </RadioGroup>
                    </FormControl>
                </Root>
            </DialogPage>
        );
    }
}

export default withFormik<TypePageProps, TypePageValues>({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,

    mapPropsToValues: () => ({ type: ChampionshipType.Individual }),
    handleSubmit: () => {},

    validationSchema: Yup.object().shape({}),
})(withChampionshipCreationData(TypePage));
