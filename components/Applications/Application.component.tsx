import React, { ChangeEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BlockchainContext } from "../../contexts/BlockchainContext";
import LoadingScreen from "../LoadingScreen.component";

interface ApplicationComponentProps {
    application: any;
    applicant: any;
    admin: boolean;
}

const proofElement = (type: string, file: string) => {
    switch (type) {
        case "image/apng":
        case "image/avif":
        case "image/gif":
        case "image/jpeg":
        case "image/png":
        case "image/svg+xml":
        case "image/webp":
            return (
                <Box
                    component="img"
                    src={file}
                    sx={{
                        width: "100%",
                    }}
                />
            );
        case "video/webm":
        case "video/ogg":
        case "video/mp4":
            return (
                <Box component="video" controls sx={{ width: "100%" }}>
                    <source src={file} type={type} />
                </Box>
            );
        default:
            return null;
    }
};

const Application: React.FC<ApplicationComponentProps> = ({
    application,
    applicant,
    admin,
}) => {
    const { addApplicantToBlockchain, donate } = useContext(BlockchainContext);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyApp = async () => {
        const appRef = doc(db, "applications", application.id);
        try {
            await updateDoc(appRef, {
                verified: true,
            });
            if (addApplicantToBlockchain) {
                await addApplicantToBlockchain(
                    applicant.id,
                    applicant.fullName,
                    applicant.address
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDonating = async () => {
        setLoading(true);
        try {
            await donate(applicant.address, amount, message);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        setOpen(false);
        setAmount("0");
        setMessage("");
    };

    return (
        <Container sx={{ margin: "4rem auto" }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{
                        textDecorationLine: "underline",
                        textDecorationColor: "#e67e22",
                    }}
                >
                    {applicant.fullName} application
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#d35400",
                    marginTop: "2rem",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "1rem",
                    boxShadow: "11px 9px 36px -6px rgba(51,51,51,0.75)",
                }}
            >
                <Typography variant="body1">
                    {application.description}
                </Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        marginBottom: "0.5rem",
                    }}
                >
                    {application.files.map((f: any) => (
                        <Grid item md={4} xs={12} key={f.file}>
                            {proofElement(f.type, f.file)}
                        </Grid>
                    ))}
                </Grid>

                {!admin ? (
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Donate
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => {
                            verifyApp();
                        }}
                    >
                        Verify
                    </Button>
                )}
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "30rem",
                            bgcolor: "background.paper",
                            padding: "2rem",
                        }}
                    >
                        <Typography variant="h5">Donation</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                marginTop: "0.75rem",
                            }}
                        >
                            <TextField
                                type="number"
                                label="Amount"
                                placeholder="Amount (ETH)"
                                name="amount"
                                id="amount"
                                onChange={(e) => {
                                    setAmount(e.target.value.toString());
                                }}
                                value={amount}
                                inputProps={{
                                    step: "0.001",
                                }}
                            />
                            <TextField
                                type="text"
                                label="Message"
                                placeholder="Message"
                                name="message"
                                id="message"
                                multiline
                                rows={2}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                value={message}
                            />
                            <Button
                                variant="contained"
                                onClick={handleDonating}
                            >
                                Donate
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
            {loading ? <LoadingScreen title="Sending Transaction..." /> : null}
        </Container>
    );
};

export default Application;
