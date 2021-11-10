import { ThemeProvider } from "@emotion/react";

import AdminArtRoute from "@routes/tools/art";

import { toolTheme } from "@styles/theme";

export default function AdminArt() {
    return (
        <ThemeProvider theme={toolTheme}>
            <AdminArtRoute />
        </ThemeProvider>
    );
}
