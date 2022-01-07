import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Features: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{ bgcolor: "#e67e22", height: "80vh", padding: "2rem" }}
        >
            <Typography
                variant="h4"
                sx={{ color: "white", textAlign: "center", marginTop: "1rem" }}
            >
                What does Charitable provide
            </Typography>

            <Grid
                container
                spacing={4}
                sx={{
                    margin: "4rem auto",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <Grid item xs={6}>
                    <Box sx={{ maxWidth: "20rem", margin: "0 auto" }}>
                        <Typography variant="h5">Decentralization</Typography>
                        <Typography variant="body1">
                            Charitable is using blockchain technology.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ maxWidth: "20rem", margin: "0 auto" }}>
                        <Typography variant="h5">Trust</Typography>
                        <Typography variant="body1">
                            Since Charitable is built on the blockchain, we
                            provide our users with total security when donating.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ maxWidth: "20rem", margin: "0 auto" }}>
                        <Typography variant="h5">Freedom</Typography>
                        <Typography variant="body1">
                            Our users are free to choose who to donate to and
                            how much
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ maxWidth: "20rem", margin: "0 auto" }}>
                        <Typography variant="h5">Help</Typography>
                        <Typography variant="body1">
                            Our primary mission is to provide help to those in
                            need.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Features;
