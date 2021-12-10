import React from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";

import { Global } from "@emotion/react";

import { AppBar as MuiAppBar, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImageIcon from "@mui/icons-material/Image";

import { CARD_EXPLORER_WIDTH } from "@routes/tools/deck/CardExplorer";
import { useDeckEditor } from "@routes/tools/deck/Context";

import { Placeholder } from "@styles/Placeholder";

import { CustomTooltipStyles, IconButton, Toolbar } from "./AppBar.styles";

export default function AppBar() {
    const { sortCards, importYDKFile, exportYDKFile, exportDeckToImage } = useDeckEditor();
    const dropzone = React.useRef<DropzoneRef>(null);
    const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

    const handleClose = React.useCallback(() => {
        setAnchorElement(null);
    }, [setAnchorElement]);
    const handleMoreClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorElement(e.currentTarget);
        },
        [setAnchorElement],
    );
    const handleDrop = React.useCallback(
        (file: File[]) => {
            importYDKFile(file[0]);
        },
        [importYDKFile],
    );
    const handleImportYDKClick = React.useCallback(() => {
        if (!dropzone.current) {
            return;
        }

        dropzone.current.open();
    }, [dropzone]);

    return (
        <MuiAppBar elevation={0} color="transparent" position="fixed" sx={{ width: `calc(100% - ${CARD_EXPLORER_WIDTH}px)`, mr: `${CARD_EXPLORER_WIDTH}px` }}>
            <Global styles={CustomTooltipStyles} />
            <Dropzone ref={dropzone} onDrop={handleDrop}>
                {({ getInputProps }) => <input type="file" {...getInputProps()} />}
            </Dropzone>
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
                <Tooltip title="더보기">
                    <IconButton onClick={handleMoreClick} disableRipple disableFocusRipple disableTouchRipple>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    open={Boolean(anchorElement)}
                    anchorEl={anchorElement}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{
                        sx: {
                            width: 320,
                        },
                    }}
                >
                    <MenuItem onClick={handleImportYDKClick}>
                        <ListItemIcon>
                            <FileDownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>덱 파일 불러오기</ListItemText>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Roboto Mono', monospace" }}>
                            Ctrl+I
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={exportYDKFile}>
                        <ListItemIcon>
                            <FileUploadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>덱 파일 내보내기</ListItemText>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Roboto Mono', monospace" }}>
                            Ctrl+E
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={exportDeckToImage}>
                        <ListItemIcon>
                            <ImageIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>이미지로 내보내기</ListItemText>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Roboto Mono', monospace" }}>
                            Ctrl+Alt+S
                        </Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </MuiAppBar>
    );
}
