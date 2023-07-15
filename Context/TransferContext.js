import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";

//INTERNAL  IMPORT
import { TransferFundsAddress, TransferFundsABI } from "./constants";

//---CONNECTING WITH SMART CONTRACT


export const TransferContext= React.createContext();

export const TransferProvider= ({ children }) => {
 
  //------USESTATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();
  const [accountBalance, setAccountBalance] = useState();


  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setError("No Account Found");
        setOpenError(true);
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      console.log(error);
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);



  //==================================================
  //TRANSFER FUNCTION

  const [transactionCount, setTransactionCount] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  //---FETCHING SMART CONTRACT
  const fetchTransferContract = (signerOrProvider) =>
    new ethers.Contract(
      TransferFundsAddress,
      TransferFundsABI,
      signerOrProvider
    );

  //---CONNECTING WITH TRANSFER SMART CONTRACT

  const connectingTransferContract = async () => {
    try {
      const web3Modal = new Wenb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferContract(signer);
      return contract;
    } catch (error) {
      console.log("Something went wrong while connecting with contract");
    }
  };

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectingTransferContract();
        const unFormatedAmount = ethers.utils.parseEther(ether);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              // gas: "0x5208",
              value: unFormatedAmount._hex,
            },
          ],
        });
        const transaction = await contract.addToBlockchain(
          address,
          unFormatedAmount,
          message
        );

        setLoading(true);
        transaction.wait();
        console.log(transaction);
        setLoading(false);

        const transactionsCount = await contract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GET ALL THE TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectingTransferContract();

        const availableTransactions = await contract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        // console.log(structuredTransactions);

        setTransaction(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransferContext.Provider
      value={{
        currentAccount,
        transferEther,
        accountBalance,
        getAllTransactions,
        transaction,
        loading,
        checkIfWalletConnected
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};