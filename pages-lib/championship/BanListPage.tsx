import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";

import { InputWrapper } from "@routes/championship/TitlePage.styles";
import { Root } from "./BanListPage.styles";

export interface BanListPageProps extends BaseChampionshipDialogPageProps {}
export interface BanListPageStates {}
export interface BanListPageValues {
    banList: string;
}

class BanListPage extends React.Component<BanListPageProps & FormikProps<BanListPageValues> & WithChampionshipCreationDataProps, BanListPageStates> {
    public componentDidUpdate(prevProps: Readonly<BanListPageProps & FormikProps<BanListPageValues>>) {
        if (prevProps.values.banList !== this.props.values.banList) {
            this.props.setValue("banList", this.props.values.banList);
        }
    }

    private renderBanListItem = (banListTitle: string) => {
        return (
            <MenuItem key={banListTitle} value={banListTitle}>
                {banListTitle}
            </MenuItem>
        );
    };
    public render() {
        const { banLists, activated, index, onValidStateChange, isValid, onHeightChange, handleChange, handleBlur, values, touched, errors } = this.props;

        return (
            <DialogPage activated={activated} index={index} onValidStateChange={onValidStateChange} isValid={isValid} onHeightChange={onHeightChange}>
                <Root>
                    <Typography variant="body1" gutterBottom>
                        대회 진행시 적용할 금제를 선택해주세요. 참가자는 해당 금제를 기준으로 덱을 제출해야 합니다.
                    </Typography>
                    <InputWrapper>
                        <FormControl fullWidth>
                            <InputLabel id="banlist-label">적용 금제 선택</InputLabel>
                            <Select
                                disabled={!activated}
                                fullWidth
                                labelId="banlist-label"
                                name="banList"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.banList}
                                label="적용 금제 선택"
                                error={touched.banList && Boolean(errors.banList)}
                            >
                                {banLists.map(this.renderBanListItem)}
                            </Select>
                            {touched.banList && Boolean(errors.banList) && (
                                <FormHelperText error={touched.banList && Boolean(errors.banList)}>{errors.banList}</FormHelperText>
                            )}
                        </FormControl>
                    </InputWrapper>
                </Root>
            </DialogPage>
        );
    }
}

export default withFormik<BanListPageProps, BanListPageValues>({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,

    mapPropsToValues: () => ({ banList: "" }),
    handleSubmit: () => {},

    validationSchema: Yup.object().shape({
        banList: Yup.string().required("대상 금제 일자를 선택해주세요."),
    }),
})(withChampionshipCreationData(BanListPage));
