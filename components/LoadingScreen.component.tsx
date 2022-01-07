import { Box, Typography } from "@mui/material";
import React from "react";

const LoadingScreen: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Box
            component="div"
            sx={{
                position: "fixed",
                height: "100vh",
                width: "100vw",
                bgcolor: "#9f9f9f",
                top: 0,
                left: 0,
                zIndex: 999999,
                opacity: 0.7,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Typography variant="h4" sx={{ color: "white" }}>
                    {title}
                </Typography>
                {/* Spinner */}
                <Box
                    sx={{
                        display: "inline-block",
                        width: "80px",
                        height: "80px",
                        ":after": {
                            content: '" "',
                            display: "block",
                            width: "64px",
                            height: "64px",
                            margin: "8px",
                            borderRadius: "50%",
                            border: "6px solid #fff",
                            borderColor: "#fff transparent #fff transparent",
                            animation: "loading 1.2s linear infinite",
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default LoadingScreen;
