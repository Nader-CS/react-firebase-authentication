import React from "react";
import classes from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import { useAuthConetxt } from "../../hooks/useAuthConetxt";
import useCollection from "../../hooks/useCollection";
import TransactionList from "./TransactionList";

const Home = () => {
  const { user } = useAuthConetxt();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {error && <p>There is an error in fetching data</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={classes.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
