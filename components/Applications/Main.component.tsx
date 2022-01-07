import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import ApplicationCard from "./ApplicationCard.component";

const Main: React.FC<{ applications: any[] }> = ({ applications }) => {
    return (
        <Box>
            <Box
                component="section"
                sx={{
                    bgcolor: "#e67e22",
                    padding: "4rem 2rem",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4">
                    Need help?
                    <br />
                    Make an application now and get donations
                </Typography>
                <Link href="/applications/new">
                    <Button variant="contained" sx={{ marginTop: "2rem" }}>
                        Make an application now
                    </Button>
                </Link>
            </Box>
            <Box sx={{ marginTop: "3rem", padding: "1rem" }}>
                {applications && applications.length > 0 ? (
                    <Grid container spacing={2}>
                        {applications.map((app) => (
                            <ApplicationCard key={app.id} app={app} />
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h5">No applications found</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Main;
