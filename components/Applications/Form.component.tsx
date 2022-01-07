import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    where,
    query,
    DocumentData,
    DocumentSnapshot,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { BlockchainContext } from "../../contexts/BlockchainContext";
import LoadingScreen from "../LoadingScreen.component";

interface FileTypeAndPath {
    file: string;
    type: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const { connectedAccount } = useContext(BlockchainContext);
    const { replace } = useRouter();

    const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (files === null) return;

        if (!connectedAccount) return;

        setLoading(true);

        const q = query(
            collection(db, "applicants"),
            where("address", "==", connectedAccount)
        );

        let applicant:
            | DocumentSnapshot<DocumentData>
            | QueryDocumentSnapshot<DocumentData>
            | undefined = await (
            await getDocs(q)
        ).docs[0];

        if (applicant?.exists()) {
            alert("You cant create more than 1 application");
            setLoading(false);
            return;
        } else {
            const applicantRef = await addDoc(collection(db, "applicants"), {
                address: connectedAccount,
                fullName: formData.fullName,
            });

            applicant = await getDoc(applicantRef);
        }

        let filesPath: FileTypeAndPath[] = [];

        const storage = getStorage();

        for (const file of Array.from(files)) {
            const storageRef = ref(
                storage,
                `applications/${Date.now()}-${file.name}`
            );
            const fileSnapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            filesPath.push({
                file: url,
                type: file.type,
            });
        }

        const applicationRef = await addDoc(collection(db, "applications"), {
            applicant: applicant.id,
            description: formData.description,
            files: filesPath,
            verified: false,
        });

        setLoading(false);

        alert(
            "Application submitted successfully, wait for verification by the admins"
        );

        replace("/applications");
    };

    return (
        <Box
            sx={{
                width: "75%",
                margin: "4rem auto",
            }}
        >
            {loading ? <LoadingScreen title="Sending Application..." /> : null}
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                Make an application
            </Typography>

            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    id="fullname"
                    label="Full name"
                    name="fullName"
                    onChange={handleFormDataChange}
                    value={formData.fullName}
                />
                <TextField
                    required
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    onChange={handleFormDataChange}
                    value={formData.description}
                />
                {files && (
                    <Grid container spacing={2}>
                        {Array.from(files).map((file) => (
                            <Grid
                                item
                                xs={4}
                                key={file.name + file.lastModified}
                            >
                                <Typography variant="body1">
                                    {file.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                )}
                <FormControl
                    required
                    sx={{
                        margin: "0 auto",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {/* <Input id="files" name="files" type="file" /> */}
                    <input
                        type="file"
                        multiple
                        name="files"
                        id="files"
                        hidden
                        onChange={(e) => {
                            setFiles(e.target.files);
                        }}
                    />
                    <label htmlFor="files">
                        <Button
                            component="span"
                            id="files-button"
                            sx={{ width: "20%" }}
                            variant="contained"
                        >
                            Upload Proof
                        </Button>
                    </label>
                </FormControl>
                <Button type="submit">Submit</Button>
            </Box>
        </Box>
    );
};

export default Form;
