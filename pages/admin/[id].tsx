import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Navbar from "../../components/Navbar.component";
import {
    doc,
    getDoc,
    getDocs,
    query,
    where,
    collection,
} from "firebase/firestore";
import { db } from "../../firebase";
import Application from "../../components/Applications/Application.component";

const ApplicationPage: NextPage = ({
    application,
    applicant,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>{`${applicant.fullName}`} application</title>
            </Head>

            <Navbar />

            <Application
                applicant={applicant}
                application={application}
                admin={true}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const admin = await getDocs(
        query(
            collection(db, "admins"),
            where("address", "==", ctx.req.cookies.address)
        )
    );
    if (admin.empty) {
        return {
            notFound: true,
        };
    }

    const id = ctx.params?.id;
    if (typeof id !== "string") {
        return {
            notFound: true,
        };
    }
    const application = await getDoc(doc(db, "applications", id));
    if (!application.exists()) {
        return {
            notFound: true,
        };
    }
    const applicant = await getDoc(
        doc(db, "applicants", application.data().applicant)
    );
    if (!applicant.exists()) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            application: {
                id: application.id,
                ...application.data(),
            },
            applicant: {
                id: applicant.id,
                ...applicant.data(),
            },
        },
    };
};

export default ApplicationPage;
