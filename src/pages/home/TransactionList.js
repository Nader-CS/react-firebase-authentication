import React from "react";
import classes from "./TransactionList.module.css";
import useFirestore from "../../hooks/useFirestore";

const TransactionList = (props) => {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul className={classes.transactions}>
      {props.transactions.map((transcation) => {
        return (
          <li key={transcation.id}>
            <p className={classes.name}>{transcation.name}</p>
            <p className={classes.amount}>${transcation.amount}</p>
            <button
              onClick={() => {
                deleteDocument(transcation.id);
              }}
            >
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
