import React, { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import classes from "./TransactionForm.module.css";
import { createPortal } from "react-dom";

const TransactionForm = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const addTransactionHandler = (e) => {
    e.preventDefault();
    addDocument({ uid: props.uid, name, amount });
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response]);

  return (
    <>
      {response.isPending &&
        createPortal(
          <div
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.3)",
              position: "fixed",
              zIndex: "1",
            }}
          >
            <span className={classes.loader}></span>
          </div>,
          document.getElementById("backdrop")
        )}
      <h3>Add a Transaction</h3>
      <form onSubmit={addTransactionHandler}>
        <label>
          <span>Transcation Name: </span>
          <input
            type="text"
            required
            onInput={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($)</span>
          <input
            type="number"
            required
            onInput={(e) => {
              setAmount(e.target.value);
            }}
            value={amount}
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
