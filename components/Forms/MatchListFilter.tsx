import React from "react";
import { FormikProps, withFormik } from "formik";

import { Button, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

import OptionBox from "@components/OptionBox";

export interface MatchListFilterFormProps {}
export interface MatchListFilterFormStates {}
export interface MatchListFilterFormValues {}

class MatchListFilterForm extends React.Component<MatchListFilterFormProps & FormikProps<MatchListFilterFormValues>, MatchListFilterFormStates> {
    public render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    필터 설정
                </Grid>
                <Grid item xs={12}>
                    <OptionBox title="매치 타입">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox size="small" />} label="티어" />
                            <FormControlLabel control={<Checkbox size="small" />} label="일반" />
                        </FormGroup>
                    </OptionBox>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" fullWidth>
                        필터 적용
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth>필터 초기화</Button>
                </Grid>
            </Grid>
        );
    }
}

export default withFormik<MatchListFilterFormProps, MatchListFilterFormValues>({
    handleSubmit: () => {},
})(MatchListFilterForm);
