import React from "react";
import classes from "./CustomError.module.css";
import Alert from "react-bootstrap/Alert";

const CustomError = (props) => {
  if (props.error.includes("email-already-in-use")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        Sorry this email is already exist
      </Alert>
    );
  }
  if (props.error.includes("weak-password")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        Password should be at least 6
      </Alert>
    );
  }
  if (props.error.includes("invalid-email")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        Sorry , This email is invalid
      </Alert>
    );
  }
  if (props.error.includes("network-request-failed")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        There is no Internet
      </Alert>
    );
  }
  if (props.error.includes("user-not-found")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        User does not exist
      </Alert>
    );
  }
  if (props.error.includes("too-many-requests")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        Too many attempts , Try again later.
      </Alert>
    );
  }
  if (props.error.includes("wrong-password")) {
    return (
      <Alert variant="danger" className={classes.alert}>
        Password is wrong
      </Alert>
    );
  }

  return (
    <Alert variant="danger" className={classes.alert}>
      Unkown Error
    </Alert>
  );
};

export default CustomError;
