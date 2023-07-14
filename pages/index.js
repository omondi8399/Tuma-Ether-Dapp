import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FaEthereum, FaUserAlt } from "react-icons/fa";

//INTERNAL IMPORT
import Style from "../styles/transferFunds.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button, Loader } from "../components/componentsindex";

//IMPORTING CONTRCT DATA
import { TransferContext} from "../Context/TransferContext";

const transferFunds = () => {

  const { checkIfWalletConnected } = useContext(TransferContext);

  useEffect(() => {
    checkIfWalletConnected();
    // console.log(transaction);
  });

  const {
    currentAccount,
    accountBalance,
    transferEther,
    getAllTransactions,
    transaction,
    loading,
  } = useContext(TransferContext);

  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  useEffect(() => {
    getAllTransactions();
    // console.log(transaction);
  });
  return (
    <div className={Style.transfer}>
      <div className={Style.transfer_box}>
        <h1>Tuma Ether</h1>
        <p>
        This is a decentralized application (DApp) that enables users to securely and conveniently transfer Ether (ETH) from one Ethereum account to another.
        </p>
        <div className={Style.transfer_box_box}>
          <div className={Style.transfer_box_box_left}>
            <Image
              src={images.transfer}
              alt="transfer"
              width={400}
              height={400}
            />
          </div>
          <div className={Style.transfer_box_box_right}>
            <h2>Now you can transfer ether</h2>
            <div className={Style.transfer_box_box_right_info}>
              <p className={Style.transfer_box_box_right_info_desktop}>
                Account: {currentAccount}
              </p>
              <p className={Style.transfer_box_box_right_info_mobile}>
                Account: {currentAccount.slice(1, 25)}...
              </p>
              <p>Balance: {accountBalance} </p>
            </div>

            {/* //TRANSFER FIELD */}
            <div className={Style.transfer_box_box_right_box}>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaUserAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="address*"
                    onChange={(e) => setTransferAccount(e.target.value)}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaEthereum />
                  </div>
                  <input
                    type="number"
                    min={1}
                    placeholder="ETH*"
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className={formStyle.Form_box_input}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="Any transfer note (optional)"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <Button
                  btnName="Transfer Funds"
                  handleClick={() =>
                    transferEther(transferAccount, transferAmount, message)
                  }
                  classStyle={Style.button}
                />
              )}
            </div>
          </div>
        </div>

        {/* //TRANSACTION HISTORY */}
        <h1 className={Style.transfer_box_h1}>Transaction History</h1>
        <p>
        This DApp provides a secure and convenient way to transfer Ether (ETH) between Ethereum accounts. The transaction history feature allows users to view their past Ether transfers. 
        </p>
        <div className={Style.transfer_box_history}>
          {transaction.map((el, i) => (
            <div className={Style.transfer_box_history_item} key={i + 1}>
              <Image src={images.transferImage} width={200} height={200} />
              <div className={Style.transfer_box_history_item_info}>
                <p>
                  {" "}
                  <span>Transfer ID:</span> #{i + 1}
                </p>
                <p>
                  <span>Amount:</span> {el.amount} ETH
                </p>
                <p>
                  <span>From:</span>
                  {el.addressFrom.slice(1, 20)}..
                </p>
                <p>
                  <span>To:</span> {el.addressTo.slice(1, 20)}..
                </p>
                <Button
                  btnName="Message"
                  handleClick={() => (
                    setReadMessage(el.message), setOpenBox(true)
                  )}
                  classStyle={Style.readButton}
                />
              </div>
            </div>
          ))}
        </div>
        {openBox == false ? (
          ""
        ) : (
          <div className={Style.messageBox} onClick={() => setOpenBox(false)}>
            <div className={Style.messageBox_box}>
              <h1>Transaction Message</h1>
              <p>{readMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transferFunds;
