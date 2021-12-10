import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import { Root } from "./YDKImporter.styles";
import { useDeckEditor } from "@routes/tools/deck/Context";

export interface YDKImporterProps {}

export default function YDKImporter(props: YDKImporterProps) {
    const { importYDKFile } = useDeckEditor();
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: NativeTypes.FILE,
            drop(item: { files: any[] }) {
                importYDKFile(item.files[0]);
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [props, importYDKFile],
    );

    return <Root ref={drop} canDrop={canDrop} isOver={isOver} />;
}
