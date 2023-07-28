import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Signup.module.css";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { auth } from "../../firebase/config";
import CustomError from "../../components/custom-error/CustomError";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";
import { AiOutlineCheck } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { useAuthConetxt } from "../../hooks/useAuthConetxt";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();
  const { dispatch } = useAuthConetxt();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.isSuccessful) {
      dispatch({ type: "LOGIN", payload: data.userInfo.user });
      navigate("/");
    }
  }, [data]);
  useEffect(() => {
    if (
      email.length > 0 &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setIsPending(true);
      fetchSignInMethodsForEmail(auth, email)
        .then((result) => {
          if (result.length > 0) {
            setIsEmailValid(false);
          } else {
            setIsEmailValid(true);
          }
          setIsPending(false);
        })
        .catch((e) => {});
    } else {
      setIsEmailValid(false);
    }
  }, [email]);
  useEffect(() => {
    if (password.length < 6) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }, [password]);
  return (
    <>
      <Form method="POST" className={classes["signup-form"]}>
        <h2>sign up</h2>
        {data && data.error && <CustomError error={data.error.code} />}
        <label>
          <span>email :</span>
          <input
            type="email"
            onInput={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            required
          />
          {isPending && (
            <Spinner
              variant="primary"
              size="sm"
              style={{ marginLeft: "0.5rem" }}
            />
          )}

          {isEmailValid && (
            <AiOutlineCheck
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.3rem",
                color: "green",
              }}
            />
          )}
          {!isEmailValid &&
            email
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
              ) && (
              <VscError
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "1.3rem",
                  color: "red",
                  marginBottom: "0.2rem",
                }}
              />
            )}
        </label>
        <label>
          <span>password :</span>
          <input
            type="password"
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            required
          />
          {isPasswordValid && (
            <AiOutlineCheck
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.3rem",
                color: "green",
              }}
            />
          )}
          {!isPasswordValid && password.length >= 1 && (
            <VscError
              style={{
                marginLeft: "0.5rem",
                fontSize: "1.3rem",
                color: "red",
                marginBottom: "0.2rem",
              }}
            />
          )}
        </label>
        <label>
          <span>Profile name :</span>
          <input
            type="text"
            onInput={(e) => setDisplayName(e.target.value)}
            value={displayName}
            name="profile_name"
            required
          />
        </label>
        <button className={classes.btn}>
          {isSubmitting ? "submitting..." : "Signup"}
        </button>
      </Form>
      {isSubmitting &&
        createPortal(
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              position: "fixed",
              zIndex: "1",
            }}
          >
            <span className={classes.loader}></span>
          </div>,
          document.getElementById("backdrop")
        )}
    </>
  );
};

export default Signup;

export async function action({ request }) {
  const data = await request.formData();
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      data.get("email"),
      data.get("password")
    );
    await updateProfile(auth.currentUser, {
      displayName: data.get("profile_name"),
    });
    return { isSuccessful: true, userInfo: res };
  } catch (e) {
    return { isSuccessful: false, error: e };
  }
}
