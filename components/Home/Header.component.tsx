import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header: React.FC = () => {
    return (
        <Box
            sx={{
                height: "92vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                color="#e67e22"
                sx={{ paddingBottom: "4rem", textAlign: "center" }}
            >
                Donate and help others without the fear of giving your money to
                unknown organisations <br />
                This is the future, this is Charitable.
            </Typography>
            <div className="wave1">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </Box>
    );
};

export default Header;
