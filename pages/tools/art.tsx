import { NextPage } from "next";

import { ThemeProvider } from "@emotion/react";

import AdminArtRoute from "@routes/tools/art";

import { toolTheme } from "@styles/theme";

const AdminArt: NextPage = () => {
    return (
        <ThemeProvider theme={toolTheme}>
            <AdminArtRoute />
        </ThemeProvider>
    );
};

export default AdminArt;
