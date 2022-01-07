import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";

import { contractAbi, contractAddress } from "../constants/contract";
import { db } from "../firebase";

declare let window: any;

interface BlockchainContextValue {
    connectWallet?: () => Promise<void>;
    connectedAccount?: string;
    isAdmin?: boolean;
    addApplicantToBlockchain?: (
        id: any,
        fullName: any,
        address: any
    ) => Promise<void>;
    getApplicantsFromBlockchain?: () => Promise<any[] | Error>;
    donate?: (to: any, amount: string, message: string) => Promise<void>;
}

export const BlockchainContext = createContext<BlockchainContextValue>({});

let ethereum: any;

if (typeof window !== "undefined") {
    ethereum = window.ethereum;
}

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const charitableContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
    );

    return charitableContract;
};

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [connectedAccount, setConnectedAccount] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                // getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (err) {
            console.log(err);

            throw new Error("No ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setConnectedAccount(accounts[0].toLowerCase());
        } catch (err) {
            console.log(err);

            throw new Error("No ethereum object.");
        }
    };

    const checkIfAdmin = async () => {
        const adminSnapshot = await getDocs(collection(db, "admins"));
        adminSnapshot.forEach((doc) => {
            if (doc.data().address.toLowerCase() === connectedAccount) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    };

    const addApplicantToBlockchain = async (
        id: any,
        fullName: any,
        address: any
    ) => {
        try {
            if (!ethereum) return alert("Please install MetaMask");

            const charitableContract = getEthereumContract();

            const txHash = await charitableContract.newApplicant(
                id,
                fullName,
                address
            );

            setLoading(true);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();

            setLoading(false);
            console.log("tx processed successfully");
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    };
    const getApplicantsFromBlockchain = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const charitableContract = getEthereumContract();

            return await charitableContract.getAllApplicants();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    };
    const donate = async (to: any, amount: string, message: string) => {
        if (!ethereum) return alert("Please install MetaMask");
        console.log(amount);
        const parsedAmount = ethers.utils.parseEther(amount);
        console.log(parsedAmount);

        const charitableContract = getEthereumContract();

        await ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: connectedAccount,
                    to,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                },
            ],
        });

        const txHash = await charitableContract.newTransaction(
            to,
            parsedAmount,
            message
        );

        setLoading(true);
        console.log(`Waiting for transaction - ${txHash.hash}`);
        await txHash.wait();

        setLoading(false);
        console.log("Transaction went successfully");
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        if (connectedAccount) {
            Cookies.set("address", connectedAccount);
            checkIfAdmin();
        } else {
            Cookies.remove("address");
        }
    }, [connectedAccount]);

    return (
        <BlockchainContext.Provider
            value={{
                connectWallet,
                connectedAccount,
                isAdmin,
                addApplicantToBlockchain,
                getApplicantsFromBlockchain,
                donate,
            }}
        >
            {children}
        </BlockchainContext.Provider>
    );
};
