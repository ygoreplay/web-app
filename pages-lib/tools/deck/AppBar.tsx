import React from "react";
import { Global } from "@emotion/react";

import { AppBar as MuiAppBar, Tooltip, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { CARD_EXPLORER_WIDTH } from "@routes/tools/deck/CardExplorer";
import { useDeckEditor } from "@routes/tools/deck/Context";

import { Placeholder } from "@styles/Placeholder";

import { CustomTooltipStyles, IconButton, Toolbar } from "./AppBar.styles";

export default function AppBar() {
    const { sortCards } = useDeckEditor();

    return (
        <MuiAppBar elevation={0} color="transparent" position="fixed" sx={{ width: `calc(100% - ${CARD_EXPLORER_WIDTH}px)`, mr: `${CARD_EXPLORER_WIDTH}px` }}>
            <Global styles={CustomTooltipStyles} />
            <Toolbar
                sx={{
                    borderBottom: "1px solid rgb(19, 47, 76)",
                    background: "rgba(0, 0, 0, 0.25)",
                    backdropFilter: "blur(15px)",
                }}
            >
                <Typography variant="h6" noWrap component="div">
                    덱 편집
                </Typography>
                <Placeholder />
                <Tooltip title="정렬">
                    <IconButton onClick={sortCards} disableRipple disableFocusRipple disableTouchRipple>
                        <SortIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="덱 파일 불러오기">
                    <IconButton onClick={sortCards} disableRipple disableFocusRipple disableTouchRipple>
                        <FileUploadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="덱 파일 내보내기">
                    <IconButton onClick={sortCards} disableRipple disableFocusRipple disableTouchRipple>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </MuiAppBar>
    );
}
