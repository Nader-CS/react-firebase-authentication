import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthConetxt } from "./useAuthConetxt";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthConetxt();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
    } catch (e) {
      setError(e.message);
      setIsPending(false);
    }
  };
  return { logout, error, isPending };
};
