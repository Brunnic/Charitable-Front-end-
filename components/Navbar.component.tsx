import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import { BlockchainContext } from "../contexts/BlockchainContext";

const Navbar: React.FC = () => {
    const { connectWallet, connectedAccount, isAdmin } =
        useContext(BlockchainContext);

    return (
        <AppBar position="static" sx={{ bgcolor: "#e67e22" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5" noWrap component="div">
                    Charitable
                </Typography>
                <Box
                    sx={{
                        display: "flex",
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
                    <Link href="/about" underline="none">
                        <Typography variant="h6" color="white">
                            About Us
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
                    <Typography variant="body1" color="white">
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
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
