import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";

import Navbar from "../../components/Navbar.component";
import Main from "../../components/Applications/Main.component";

const ApplicationsPage: NextPage = ({
    apps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box component="div">
            <Head>
                <title>Applications</title>
            </Head>

            <Navbar />

            <Main applications={apps} />
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const applicationsSnapshot = await getDocs(
        query(collection(db, "applications"), where("verified", "!=", false))
    );
    let apps: any[] = [];
    for (const document of applicationsSnapshot.docs) {
        const applicant = await getDoc(
            doc(db, "applicants", document.data().applicant)
        );
        apps.push({
            ...document.data(),
            id: document.id,
            applicant: applicant.data(),
        });
    }

    return {
        props: {
            apps,
        },
    };
};

export default ApplicationsPage;
