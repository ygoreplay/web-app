import React from "react";
import memoizeOne from "memoize-one";

import { Button, ButtonGroup } from "@mui/material";

export interface ToggleButtonProps<T extends string> extends Omit<React.ComponentProps<typeof ButtonGroup>, "onChange"> {
    items: { label: string; value: T }[];
    onChange(value: T): void;
    value: T;
}
export interface ToggleButtonStates {}

export default class ToggleButton<T extends string> extends React.Component<ToggleButtonProps<T>, ToggleButtonStates> {
    private handleClick = memoizeOne((value: T) => {
        return () => {
            console.info(":D");
            this.props.onChange(value);
        };
    });

    private renderItem = (item: ToggleButtonProps<T>["items"][0]) => {
        const { value } = this.props;

        return (
            <Button key={item.value} variant={value === item.value ? "contained" : "outlined"} disableElevation onChange={this.handleClick(item.value)}>
                {item.label}
            </Button>
        );
    };
    public render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { items, onChange, value, ...rest } = this.props;

        return <ButtonGroup {...rest}>{items.map(this.renderItem)}</ButtonGroup>;
    }
}
