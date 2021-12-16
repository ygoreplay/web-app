import React from "react";
import Dropzone, { DropzoneRef, DropzoneState } from "react-dropzone";
import memoizeOne from "memoize-one";

import { ParticipantData } from "@routes/championship/submit/types";

import { Item, NameInput, Root, Button } from "@routes/championship/submit/ParticipantList.styles";

export interface ParticipantListProps {
    count: number;
    value: ParticipantData[];
    onChange(value: ParticipantData[]): void;
    disabled: boolean;
}
export interface ParticipantListStates {}

export default class ParticipantList extends React.Component<ParticipantListProps, ParticipantListStates> {
    private dropzoneRefs = this.props.value.map(() => React.createRef<DropzoneRef>());

    private handleFileDrop = memoizeOne((index: number) => {
        return ([acceptedFile]: File[]) => {
            const { value, onChange } = this.props;

            return onChange(value.map((item, i) => (i === index ? { ...item, deckFile: acceptedFile } : item)));
        };
    });
    private handleNameChange = memoizeOne((index: number) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value, onChange } = this.props;

            return onChange(value.map((item, i) => (i === index ? { ...item, name: e.target.value } : item)));
        };
    });
    private handleUploadFileClick = memoizeOne((index: number) => {
        return () => {
            const targetRef = this.dropzoneRefs[index];
            if (!targetRef || !targetRef.current) {
                return;
            }

            targetRef.current.open();
        };
    });

    private renderDropzone = ({ getInputProps }: DropzoneState) => {
        return <input type="file" {...getInputProps()} />;
    };

    private renderItem = (value: ParticipantData, index: number) => {
        const { count, disabled } = this.props;

        return (
            <Item key={index}>
                <Dropzone ref={this.dropzoneRefs[index]} multiple={false} accept=".ydk" onDrop={this.handleFileDrop(index)}>
                    {this.renderDropzone}
                </Dropzone>
                <NameInput
                    disabled={disabled}
                    value={value.name}
                    onChange={this.handleNameChange(index)}
                    placeholder={count === 1 ? "참가자명 입력..." : `${index + 1}번 팀원 이름 입력...`}
                />
                <Button disabled={disabled} onClick={this.handleUploadFileClick(index)} variant="outlined" disableElevation>
                    {value.deckFile ? `다른 덱 파일 선택` : "덱 파일 추가"}
                </Button>
            </Item>
        );
    };

    public render() {
        const { value } = this.props;

        return <Root>{value.map(this.renderItem)}</Root>;
    }
}
