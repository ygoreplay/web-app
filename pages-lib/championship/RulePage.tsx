import React from "react";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { Root } from "@routes/championship/TitlePage.styles";

export interface RulePageProps extends BaseChampionshipDialogPageProps {}
export interface RulePageStates {}
export interface RulePageValues {
    shareBanList: boolean;
    shareCardCount: boolean;
}

class RulePage extends React.Component<RulePageProps & FormikProps<RulePageValues> & WithChampionshipCreationDataProps, RulePageStates> {
    public componentDidUpdate(prevProps: Readonly<RulePageProps & FormikProps<RulePageValues>>) {
        if (prevProps.values.shareBanList !== this.props.values.shareBanList) {
            this.props.setValue("shareBanList", this.props.values.shareBanList);
        }

        if (prevProps.values.shareCardCount !== this.props.values.shareCardCount) {
            this.props.setValue("shareCardCount", this.props.values.shareCardCount);
        }
    }

    public render() {
        const { index, activated, onValidStateChange, isValid, onHeightChange, handleChange, handleBlur, values } = this.props;

        return (
            <DialogPage activated={activated} index={index} onValidStateChange={onValidStateChange} isValid={isValid} onHeightChange={onHeightChange}>
                <Root>
                    <Typography variant="body1">
                        적용할 특수 룰을 선택해주세요. 모든 참가자는 해당 룰이 적용된 조건에 부합하는 덱만 제출할 수 있게 됩니다.
                    </Typography>
                    <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={!activated}
                                        checked={values.shareBanList}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="shareBanList"
                                    />
                                }
                                label="금제 공유"
                            />
                        </FormGroup>
                        <FormHelperText>
                            금제를 공유하면 참가자들의 덱을 모두 합하여 해당 카드에 적용된 금제 매수 이상의 카드를 채용 할 수 없습니다.
                        </FormHelperText>
                    </FormControl>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={!activated}
                                        checked={values.shareCardCount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="shareCardCount"
                                    />
                                }
                                label="카드 매수 공유"
                            />
                        </FormGroup>
                        <FormHelperText>매수를 공유하면 금제가 적용되지 않은 카드의 경우 참가자의 덱을 모두 합하여 3장까지 채용이 가능합니다.</FormHelperText>
                    </FormControl>
                </Root>
            </DialogPage>
        );
    }
}

export default withFormik<RulePageProps, RulePageValues>({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,

    mapPropsToValues: () => ({ shareBanList: false, shareCardCount: false }),
    handleSubmit: () => {},

    validationSchema: Yup.object().shape({}),
})(withChampionshipCreationData(RulePage));
