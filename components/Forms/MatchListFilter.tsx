import _ from "lodash";
import React from "react";
import { FormikProps, withFormik } from "formik";
import memoizeOne from "memoize-one";

import { Button, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

import OptionBox from "@components/OptionBox";

import { Root } from "@forms/MatchListFilter.styles";

export interface MatchListFilterFormProps {
    onSubmit(values: MatchListFilterFormValues): Promise<void>;
    initialValues: MatchListFilterFormValues;
    value: MatchListFilterFormValues;
    banLists: string[];
}
export interface MatchListFilterFormStates {}

export interface MatchListFilterFormValues {
    includeSingles: boolean;
    includeMatches: boolean;
    includeTierMatches: boolean;
    includeNormalMatches: boolean;
    banLists: string[];
}

class MatchListFilterForm extends React.Component<MatchListFilterFormProps & FormikProps<MatchListFilterFormValues>, MatchListFilterFormStates> {
    private handleBanListCheckBoxChange = memoizeOne((value: string) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { values, setFieldValue } = this.props;
            const newValue = e.currentTarget.checked ? [...values.banLists, value] : values.banLists.filter(item => item !== value);

            setFieldValue("banLists", newValue, true);
        };
    });

    private renderBanListCheckBox = (value: string) => {
        const { values } = this.props;

        return <Checkbox size="small" checked={values.banLists.indexOf(value) >= 0} onChange={this.handleBanListCheckBoxChange(value)} />;
    };
    private renderCheckBox = (name: Exclude<keyof MatchListFilterFormValues, "banLists">) => {
        const { values, handleChange, handleBlur } = this.props;

        return <Checkbox size="small" checked={values[name]} name={name} onChange={handleChange} onBlur={handleBlur} />;
    };
    public render() {
        const { initialValues, values, handleReset, handleSubmit, value, banLists } = this.props;
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
                        <OptionBox title="금제 설정">
                            <FormGroup>
                                {banLists.map(v => (
                                    <FormControlLabel key={v} control={this.renderBanListCheckBox(v)} label={v} />
                                ))}
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
