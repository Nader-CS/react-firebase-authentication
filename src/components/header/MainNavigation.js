import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthConetxt } from "../../hooks/useAuthConetxt";

const MainNavigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthConetxt();

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.title}>Money Tracker</li>

        {!user && (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Hello {user.displayName.toUpperCase()}</li>
            <li>
              <button className={classes.btn} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
