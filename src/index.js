import React from "react";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import ServiceInfo from "./pages/ServiceInfo";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import EEHome from "./pages/employeeExchange/Home";
import EGHome from "./pages/employeeGather/Home";
import MGHome from "./pages/managerGather/Home";
import MGManageAccount from "./pages/managerGather/ManageAccount"
import MEHome from "./pages/managerExchange/Home";
import MEManageAccount from "./pages/managerExchange/ManageAccount"
import AdminHome from "./pages/admin/home/Home";
import AdminManageAccount from "./pages/admin/ManageAccount";
import SearchPackage from "./components/searchPackage/SearchPackage";
import AddPackage from "./pages/employeeExchange/AddPackage";
import List from "./pages/admin/list/List";
import GatherTable from "./pages/admin/gatherTable/GatherTable";
import PackageDetail from "./pages/shared/PackageDetail";
import Register from "./pages/Register";
import ViewReceipt from './pages/employeeExchange/ViewReceipt'
import NewPieChart from './components/charts/NewPieChart'
import OutgoingForm from "./pages/employeeGather/OutgoingForm";
import IncomingForm from "./pages/employeeGather/IncomingForm";
import IncomingPackages from "./pages/employeeGather/IncomingPackages";
import OutgoingPackages from "./pages/employeeGather/OutgoingPackages";
import ExchangeTable from "./pages/admin/exchangeTable/ExchangeTable";
import Auth from "./pages/shared/Auth";
import Authorization from "./pages/shared/Authorization";
import Profiler from "./pages/admin/profile/Single"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "serviceInfo",
    element: <ServiceInfo />,
  },
  {
    path: "employeeExchange",
    element: <Authorization path="employeeExchange" />,
  },
  {
    path: "employeeGather",
    element: <Authorization path="employeeGather" />,
  },
  {
    path: "managerGather",
    element: <Authorization path="managerGather" />,
  },
  {
    path: "managerGather/manageAccount",
    element: <Authorization path="managerGather/manageAccount" />,
  },
  {
    path: "managerExchange",
    element: <Authorization path="managerExchange" />,
  },
  {
    path: "managerExchange/manageAccount",
    element: <Authorization path="managerExchange/manageAccount" />,
  },
  {
    path: "admin",
    element: <Authorization path="admin" />,
  },
  {
    path: "admin/manageAccount",
    element: <Authorization path="admin/manageAccount" />,
  },
  {
    path: "searchPackage",
    element: <SearchPackage />,
  },
  {
    path: "addPackage",
    element: <Authorization path="addPackage" />,
  },
  {
    path: "users",
    element: <Authorization path="users" />,
  },
  {
    path: "/admin/gather",
    element: <Authorization path="/admin/gather" />,
  },
  {
    path:"gathering/:gatherId",
    element: <Authorization path="gathering/:gatherId" />,
  },
  {  path: "packageDetail/:packageId",
    element: <PackageDetail />,
  },
  {
    path: "logout",
    element:<LoginPage/>, //test
  },
  {
    path: "register",
    element:<Register/>, 
  },
  {  path: "viewReceipt/:packageId",
    element: <Authorization path="viewReceipt/:packageId" />,
  },
  {  path: "test",
    element: <NewPieChart />,
  },

  {
    path: "outgoingForm/:packageId",
    element: <Authorization path="outgoingForm/:packageId" />,
  },
  {
    path: "incomingForm/:packageId",
    element: <Authorization path="incomingForm/:packageId" />,
  },
  {
    path: "incomingPackages",
    element: <Authorization path="incomingPackages" />,
  },
  {
    path: "outgoingPackages",
    element: <Authorization path="outgoingPackages" />,
  },
  {
    path: "/admin/profile",
    element:<Profiler/>, 
  },
  {
    path: "newuser",
    element: <Authorization path="newuser"/>, 
  },
  {
    path: "newgathering",
    element: <Authorization path="newgathering"/>, 
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);