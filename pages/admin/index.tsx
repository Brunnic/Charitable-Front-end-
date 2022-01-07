import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import {
    getDocs,
    collection,
    query,
    where,
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar.component";
import Admin from "../../components/Admin/Admin.component";

const AdminPage: NextPage = ({
    applications,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>Admin Page</title>
            </Head>

            <Navbar />

            <Admin applications={applications} />
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

    const applicationsSnapshot = await getDocs(
        query(collection(db, "applications"), where("verified", "==", false))
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
            applications: apps,
        },
    };
};

export default AdminPage;
