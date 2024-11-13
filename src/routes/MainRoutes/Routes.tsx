import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Home from "../../pages/HomePages/Home/Home";
import ErrorElement from "../../layout/ErrorElement/ErrorElement";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import MyAccount from "@/pages/MyAccount/MyAccount";
import Services from "@/pages/ServicesPage/Services/Services";
import SingleService from "@/pages/ServicesPage/SingleService/SingleService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/account",
        element: <MyAccount />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:id",
        element: <SingleService />,
      },
    ],
  },
]);

export default router;
