import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthConetxt } from "./useAuthConetxt";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthConetxt();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({ type: "LOGIN", payload: userCredential.user });
          navigate("/");
        })
        .catch((e) => {
          setError(e);
        });
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};
