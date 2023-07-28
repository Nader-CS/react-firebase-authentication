import MainNavigation from "../components/header/MainNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default RootLayout;
