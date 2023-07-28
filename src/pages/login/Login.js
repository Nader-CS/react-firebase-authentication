import React, { useState } from "react";
import classes from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";
import CustomError from "../../components/custom-error/CustomError";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={classes["login-form"]} onSubmit={submitHandler}>
      <h2>login</h2>
      {error && <CustomError error={error.code} />}
      <label>
        <span>email :</span>
        <input
          type="email"
          onInput={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password :</span>
        <input
          type="password"
          onInput={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      {!isPending && <button className={classes.btn}>Login</button>}
      {isPending && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </form>
  );
};

export default Login;
