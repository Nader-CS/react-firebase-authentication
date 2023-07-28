import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { action as signup } from "./pages/signup/Signup";
import { useAuthConetxt } from "./hooks/useAuthConetxt";
import { createPortal } from "react-dom";
import classes from "./App.module.css";
import ProtectedRoute from "./utilities/ProtectedRoute";
import PublicRoute from "./utilities/PublicRoute";
import RootLayout from "./layout/RootLayout";
import Error from "./pages/error/Error";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         element: <PublicRoute />,
//         children: [
//           {
//             path: "login",
//             element: <Login />,
//           },
//           { path: "signup", element: <Signup />, action: signup },
//         ],
//       },
//       {
//         element: <ProtectedRoute />,
//         children: [{ path: "/data", element: <Data /> }],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup />, action: signup },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [{ element: <Home />, path: "" }],
      },
    ],
  },
]);

function App() {
  const { authIsReady } = useAuthConetxt();
  return (
    <>
      {!authIsReady &&
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
