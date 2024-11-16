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
import DashboardLayout from "@/pages/Dashboard/AdminDashboardLayout/AdminDashboardLayout";
import AdminProfile from "@/pages/Dashboard/AdminDashboardPages/AdminProfile/AdminProfile";
import UserProfile from "@/pages/Dashboard/UserDashboardPages/UserProfile/UserProfile";
import AdminDashboardLayout from "@/pages/Dashboard/AdminDashboardLayout/AdminDashboardLayout";
import UserDashboardLayout from "@/pages/Dashboard/UserDashboardLayout/UserDashboardLayout";
import AddService from "@/pages/Dashboard/AdminDashboardPages/AddService/AddService";
import ManageServices from "@/pages/Dashboard/AdminDashboardPages/ManageServices/ManageServices";

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
  {
    path: "/admin/dashboard",
    errorElement: <ErrorElement />,
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "adminProfile",
        element: <AdminProfile />,
      },
      {
        path: "addService",
        element: <AddService />,
      },
      {
        path: "manageService",
        element: <ManageServices />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    errorElement: <ErrorElement />,
    element: <UserDashboardLayout />,
    children: [
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      // {
      //   path: "addProduct",
      //   element: <DashboardAddProduct />,
      // },
    ],
  },
]);

export default router;
