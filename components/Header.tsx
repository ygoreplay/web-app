import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Toolbar } from "@mui/material";

import { AppBar, LinkContent, Logo, Root } from "@components/Header.styles";

export default function Header() {
    const router = useRouter();

    return (
        <AppBar elevation={0} position="sticky">
            <Toolbar>
                <Root>
                    <Logo />
                    <Link href="/" passHref>
                        <LinkContent active={router.route === "/"}>홈</LinkContent>
                    </Link>
                    <Link href="/matches" passHref>
                        <LinkContent active={router.route.startsWith("/matches")}>매치</LinkContent>
                    </Link>
                    <Link href="/decks" passHref>
                        <LinkContent>덱</LinkContent>
                    </Link>
                </Root>
            </Toolbar>
        </AppBar>
    );
}
