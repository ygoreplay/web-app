import { NextPage } from "next";

import { useApolloClient } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";

import AdminArtRoute from "@routes/tools/art";

import { toolTheme } from "@styles/theme";

const AdminArt: NextPage = () => {
    const client = useApolloClient();

    return (
        <ThemeProvider theme={toolTheme}>
            <AdminArtRoute client={client} />
        </ThemeProvider>
    );
};

export default AdminArt;
