import { useEffect, useState } from "react";
import { getAccount, sendFunds, fetchPayments } from "../utils/stellar";
import { useGlobalContext } from "../context/GlobalContext";
import Link from "next/link";

const Account = ({ wallet }) => {
  const [loading, setLoading] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [destination, setDestination] = useState({
    publicKey: "",
    amount: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const { publicKey } = useGlobalContext();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getAccount(publicKey);
      console.log(data);
      
      if (data?.balances) {
        setWalletDetails(data);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [wallet]);

  useEffect(() => {
    if (publicKey) {
      fetchPayments(publicKey).then(({ sentPayments, receivedPayments }) => {
        const allTransactions = [
          ...sentPayments.map((payment) => ({
            ...payment,
            type: "Sent",
          })),
          ...receivedPayments.map((payment) => ({
            ...payment,
            type: "Received",
          })),
        ];

        allTransactions.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        console.log(allTransactions);

        setTransactions(allTransactions);
      });
    }
  }, [wallet]);

  return (
    <div>
      <Link
        href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
        target="_blank"
        className="text-blue-800 underline"
        prefetch={false}
      >
        View All Transactions
      </Link>
    </div>
  );
};

export default Account;
