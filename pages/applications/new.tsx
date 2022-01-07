import type { NextPage } from "next";
import Head from "next/head";
import Form from "../../components/Applications/Form.component";
import Navbar from "../../components/Navbar.component";

const NewApp: NextPage = () => {
    return (
        <div>
            <Head>
                <title>New Application</title>
            </Head>

            <Navbar />

            <Form />
        </div>
    );
};

export default NewApp;
