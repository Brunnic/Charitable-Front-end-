import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ApplicationCard from "../Applications/ApplicationCard.component";

const Admin: React.FC<{ applications: any[] }> = ({ applications }) => {
    return (
        <Container sx={{ marginTop: "4rem" }}>
            <Grid container spacing={2}>
                {applications && applications.length > 0 ? (
                    applications.map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                    ))
                ) : (
                    <Typography variant="h4">
                        No unverified applications
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default Admin;
