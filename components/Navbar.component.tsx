import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";

import { BlockchainContext } from "../contexts/BlockchainContext";

const Navbar: React.FC = () => {
    const { connectWallet, connectedAccount, isAdmin } =
        useContext(BlockchainContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <AppBar position="static" sx={{ bgcolor: "#e67e22" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{
                        display: {
                            xs: "none",
                            sm: "inline-block",
                        },
                    }}
                >
                    Charitable
                </Typography>
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "1rem",
                        justifySelf: "center",
                        alignSelf: "center",
                    }}
                >
                    <Link href="/" underline="none">
                        <Typography variant="h6" color="white">
                            Home
                        </Typography>
                    </Link>
                    <Link href="/applications" underline="none">
                        <Typography variant="h6" color="white">
                            Applications
                        </Typography>
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" underline="none">
                            <Typography variant="h6" color="white">
                                Admin
                            </Typography>
                        </Link>
                    )}
                </Box>
                {connectedAccount ? (
                    <Typography
                        variant="body1"
                        color="white"
                        sx={{
                            display: {
                                xs: "none",
                                md: "inline-block",
                            },
                        }}
                    >
                        {connectedAccount}
                    </Typography>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "white",
                            color: "#e67e22",
                            ":hover": {
                                bgcolor: "#d35400",
                                color: "white",
                            },
                        }}
                        onClick={() => {
                            if (connectWallet) connectWallet();
                        }}
                    >
                        Connect Wallet
                    </Button>
                )}
                <MenuIcon
                    onClick={() => setMenuOpen(!menuOpen)}
                    sx={{
                        display: {
                            xs: "inline-block",
                            sm: "none",
                        },
                    }}
                />
                <Box
                    sx={{
                        display: {
                            xs: "block",
                            sm: "none",
                        },
                        position: "absolute",
                        top: 56,
                        left: 0,
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            padding: "0.5rem",
                            visibility: !menuOpen ? "hidden" : "visible",
                            // transition: "visibility 1s linear 1s",
                            height: !menuOpen ? "0px" : "fit",
                            transition: "height 2s linear",
                            bgcolor: "whitesmoke",
                            boxShadow: "0px 17px 28px -5px rgba(28,28,28,0.75)",
                            zIndex: 99,
                            width: "100%",
                        }}
                    >
                        {connectedAccount && (
                            <Typography variant="body1" color="black">
                                {connectedAccount}
                            </Typography>
                        )}
                        <Link href="/" underline="none">
                            <Typography variant="body1" color="black">
                                Home
                            </Typography>
                        </Link>
                        <Link href="/applications" underline="none">
                            <Typography variant="body1" color="black">
                                Applications
                            </Typography>
                        </Link>
                        {isAdmin && (
                            <Link href="/admin" underline="none">
                                <Typography variant="h6" color="white">
                                    Admin
                                </Typography>
                            </Link>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
