import _ from "lodash";
import React from "react";
import { FormikProps, withFormik } from "formik";

import { Button, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

import OptionBox from "@components/OptionBox";

import { Root } from "@forms/MatchListFilter.styles";

export interface MatchListFilterFormProps {
    onSubmit(values: MatchListFilterFormValues): Promise<void>;
    initialValues: MatchListFilterFormValues;
    value: MatchListFilterFormValues;
}
export interface MatchListFilterFormStates {}

export interface MatchListFilterFormValues {
    includeSingles: boolean;
    includeMatches: boolean;
    includeTierMatches: boolean;
    includeNormalMatches: boolean;
}

class MatchListFilterForm extends React.Component<MatchListFilterFormProps & FormikProps<MatchListFilterFormValues>, MatchListFilterFormStates> {
    private renderCheckBox = (name: keyof MatchListFilterFormValues) => {
        const { values, handleChange, handleBlur } = this.props;

        return <Checkbox size="small" checked={values[name]} name={name} onChange={handleChange} onBlur={handleBlur} />;
    };
    public render() {
        const { initialValues, values, handleReset, handleSubmit, value } = this.props;
        const isChanged = !_.isEqual(value, values);

        return (
            <Root onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        필터 설정
                    </Grid>
                    <Grid item xs={12}>
                        <OptionBox title="경기 형식">
                            <FormGroup>
                                <FormControlLabel control={this.renderCheckBox("includeSingles")} label="싱글" />
                                <FormControlLabel control={this.renderCheckBox("includeMatches")} label="매치" />
                            </FormGroup>
                        </OptionBox>
                    </Grid>
                    <Grid item xs={12}>
                        <OptionBox title="경기 구분">
                            <FormGroup>
                                <FormControlLabel control={this.renderCheckBox("includeTierMatches")} label="티어" />
                                <FormControlLabel control={this.renderCheckBox("includeNormalMatches")} label="일반" />
                            </FormGroup>
                        </OptionBox>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" color="secondary" variant="outlined" fullWidth disabled={!isChanged}>
                            필터 적용
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="reset" color="secondary" fullWidth disabled={_.isEqual(initialValues, values)} onClick={handleReset}>
                            필터 초기화
                        </Button>
                    </Grid>
                </Grid>
            </Root>
        );
    }
}

export default withFormik<MatchListFilterFormProps, MatchListFilterFormValues>({
    mapPropsToValues: props => ({ ...props.initialValues }),
    handleSubmit: async (values, { props: { onSubmit } }) => {
        await onSubmit(values);
    },
})(MatchListFilterForm);
