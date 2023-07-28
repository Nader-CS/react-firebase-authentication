import React from "react";
import MainNavigation from "../../components/header/MainNavigation";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <MainNavigation />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 68.9px)",
        }}
      >
        <div style={{ width: "50%", textAlign: "center" }}>
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p style={{ marginTop: "1rem" }}>
              This page you want to Follow does not exist!!!!
            </p>
            <p style={{ fontWeight: "bold" }}>404!</p>
            <Button variant="primary">
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Go To Home
              </Link>
            </Button>
          </Alert>
        </div>
      </div>
    </>
  );
};

export default Error;
