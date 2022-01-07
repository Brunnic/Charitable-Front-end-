import type { NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/Navbar.component";
import Header from "../components/Home/Header.component";
import Features from "../components/Home/Features.component";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Charitable</title>
            </Head>

            <Navbar />

            <Header />
            <Features />
        </div>
    );
};

export default Home;
