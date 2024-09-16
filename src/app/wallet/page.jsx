"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { createAndFundWallet, fetchAccount } from "../utils/stellar";
import Account from "../components/Account";
import Link from "next/link";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LiaDonateSolid } from "react-icons/lia";
import { TbWorldCheck } from "react-icons/tb";
import { FaWallet } from "react-icons/fa6";
import { isConnected } from "@stellar/freighter-api";
import { useGlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({
    publicKey: "",
    secretKey: "",
  });
  const [inputKeys, setInputKeys] = useState({
    publicKey: "",
    secretKey: "",
  });
  const [copySuccess, setCopySuccess] = useState({
    publicKey: false,
    secretKey: false,
  });

  const [isAppConnected, setIsAppConnected] = useState(false); // Add state for connection status
  const [balance, setBalance] = useState("0");
  const { publicKey } = useGlobalContext();

  const handleFetchAccount = async () => {
    setLoading(true);
    try {
      const account = await fetchAccount(publicKey);
      console.log(account);
      setBalance(account ? account?.balances[0].balance : "");
      console.log(account?.balances[0].balance);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch connection status on component load
  useEffect(() => {
    const checkConnection = async () => {
      const connectionStatus = await isConnected();
      setIsAppConnected(connectionStatus);
    };
    checkConnection();
    handleFetchAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputKeys((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (publicKey) => {
    navigator.clipboard.writeText(publicKey).then(() => {
      setCopySuccess((prev) => ({ ...prev, [publicKey]: true }));
      setTimeout(
        () => setCopySuccess((prev) => ({ ...prev, [publicKey]: false })),
        2000
      );
    });
  };

  return (
    <Layout>
      <h2 className="text-xl">Wallet & History</h2>
      <div className="w-full">
        {!publicKey ? (
          <section className="container flex items-center max-w-6xl px-8 mx-auto xl:px-5 h-full">
            <div>
              <div className="flex flex-wrap items-center sm:-mx-3 pt-12 pb-12">
                <div className="w-full md:w-1/2 md:px-3">
                  <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                      <span className="block text-indigo-600 xl:inline">
                        Connect Your Crypto Wallet
                      </span>
                    </h1>
                    <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                      Securely connect your Stellar wallet to our platform and
                      unlock a world of secure and transparent ticketing
                      opportunities.
                    </p>
                    <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                      {isAppConnected ? (
                        <Link
                          href="#"
                          className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                        >
                          <FaWallet className="mr-2" />
                          Connect Wallet
                        </Link>
                      ) : (
                        <Link
                          href="https://www.freighter.app/"
                          target="_blank"
                          className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                        >
                          <FaWallet className="mr-2" />
                          Install Freighter Wallet
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <img src="https://cdn-icons-png.flaticon.com/512/9532/9532823.png" />
                </div>
              </div>
              <div className="space-y-2 mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Connect Your Wallet?
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Unlock a safe and transparent way to donate and support animal
                  feeders by securely connecting your Stellar wallet to our
                  platform.
                </p>
              </div>

              <div className="flex flex-wrap m-4">
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <AiOutlineSafetyCertificate />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Secure Donation Storage
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Keep your donations safe in your own wallet, where only
                        you control your funds.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <LiaDonateSolid />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Decentralized Donation Management
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Donate and track your contributions directly from your
                        wallet, without relying on a third party.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <TbWorldCheck />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Help Feed Animals
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Easily donate to feeders who are posting about their
                        needs, ensuring your funds go directly to helping
                        animals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap m-4">
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <AiOutlineSafetyCertificate />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Transparent Transactions
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Every donation is recorded on the blockchain, giving you
                        a clear and trusted record of where your money goes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <LiaDonateSolid />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Lowest Fees
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Lowest possible fees without any unnecessary third party
                        commissions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                        <TbWorldCheck />
                      </div>
                      <h2 className="text-gray-900 text-lg title-font font-medium">
                        Transaction History
                      </h2>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        Keep a detailed history of all your donations, making it
                        easy to see how and when you’ve helped feed animals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex gap-4">
            <div className="p-8 bg-white rounded-lg shadow-lg w-1/3">
              <h3 className="mb-4 text-lg font-semibold text-gray-700">
                Stellar Account
              </h3>
              <div className="mb-4 flex items-center">
                <p className="truncate overflow-hidden text-ellipsis">
                  <strong>Public Key:</strong> {publicKey}
                </p>
                <button
                  onClick={() => handleCopy("publicKey")}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {copySuccess.publicKey ? "Copied!" : <FaRegCopy />}
                </button>
              </div>
              <div className="mb-4">
                <p className="truncate">
                  <strong>Balance:</strong> {balance}
                </p>
              </div>
            </div>
            <div className="w-2/3">
              <Account wallet={wallet} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wallet;
