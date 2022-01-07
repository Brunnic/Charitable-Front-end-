import { Grid, Box, Typography, Button, Link } from "@mui/material";
import React from "react";

interface ApplicationCardProps {
    app: any;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ app }) => {
    return (
        <Grid
            item
            key={app.id}
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
            xs={12}
            md={6}
            lg={4}
        >
            <Box
                sx={{
                    bgcolor: "#e67e22",
                    color: "white",
                    width: "100%",
                    padding: "0.5rem",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                }}
            >
                <Typography variant="h5" sx={{ width: "100%" }}>
                    {app.applicant.fullName}
                </Typography>
            </Box>
            <Box
                sx={{
                    borderLeft: "1px solid #9f9f9f",
                    borderRight: "1px solid #9f9f9f",
                    padding: "0.5rem",
                    height: "10rem",
                }}
            >
                {app.description.substring(0, 400) + " ..."}
            </Box>
            <Box
                sx={{
                    borderBottomLeftRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                    bgcolor: "#e67e22",
                    height: "3rem",
                    textAlign: "center",
                    padding: "0.5rem",
                }}
            >
                <Link
                    href={
                        app.verified
                            ? `/applications/${app.id}`
                            : `/admin/${app.id}`
                    }
                >
                    <Button variant="contained">Learn more</Button>
                </Link>
            </Box>
        </Grid>
    );
};

export default ApplicationCard;
