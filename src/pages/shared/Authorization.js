import useAuth from "./Auth";
import React, { useState, useEffect } from "react";
import EEHome from "../employeeExchange/Home";
import EGHome from "../employeeGather/Home";
import MGHome from "../managerGather/Home";
import MGManageAccount from "../managerGather/ManageAccount"
import MEHome from "../managerExchange/Home";
import MEManageAccount from "../managerExchange/ManageAccount"
import AdminHome from "../admin/home/Home";
import AdminManageAccount from "../admin/ManageAccount";
import AddPackage from "../employeeExchange/AddPackage";
import List from "../admin/list/List";
import GatherTable from "../admin/gatherTable/GatherTable";
import ViewReceipt from '../employeeExchange/ViewReceipt'
// import NewPieChart from './components/charts/NewPieChart'
import OutgoingForm from "../employeeGather/OutgoingForm";
import IncomingForm from "../employeeGather/IncomingForm";
import IncomingPackages from "../employeeGather/IncomingPackages";
import OutgoingPackages from "../employeeGather/OutgoingPackages";
import ExchangeTable from "../admin/exchangeTable/ExchangeTable";
import App from "../../App";
import CEORegister from "../admin/new/NewForCeo";
import { CeoUserInputs } from "../admin/new/formSource";
import { useNavigate } from "react-router-dom";
import New from "../admin/new/New";
import NewGathering from "../admin/new/NewGathering";
import { userInputs,gatheringInputs } from "../admin/new/formSource";
const Authorization = ({ path }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    console.log("1", token);
    const {role} = useAuth(token);
    console.log("2", role);
    const [authorizedComponent, setAuthorizedComponent] = useState(null);
    // Simulate role-based access to different paths/endpoints
    const checkPermission = (path, role) => {
      // Logic to check if the role has permission for the path/endpoint
      // Replace this with your actual permission logic
      if (path === 'employeeExchange' && role === 'employee_exchange') {
        return <EEHome/>
      } else if (path ==='employeeGather' && role === 'employee_gather') {
        return <EGHome/>
      } else if (path === 'managerGather' && role ==='manager_gather') {
        return <MGHome/>
      } else if (path === 'managerGather/manageAccount' && role === 'manager_gather') {
        return <MGManageAccount />;
      } else if (path === 'managerExchange' && role === 'manager_exchange') {
        return <MEHome />;
      } else if (path === 'managerExchange/manageAccount' && role === 'manager_exchange') {
        return <MEManageAccount />;
      } else if (path === 'admin' && role === 'ceo') {
        return <AdminHome />;
      } else if (path === 'admin/manageAccount' && role === 'ceo') {
        return <AdminManageAccount />;
      } else if (path === 'addPackage' && role === 'employee_exchange') {
        return <AddPackage />;
      } else if (path === 'users' && (role === 'ceo' || role ==='manager_gather' || role ==='manager_exchange')) {
        return <List role = {role}/>;
      }  else if (path === '/admin/gather' && role === 'ceo') {
        return <GatherTable />;
      } else if (path === 'gathering/:gatherId' && role ==='ceo') {
        return <ExchangeTable/>;
      } else if (path === 'viewReceipt/:packageId' && (role ==='employee_exchange' || role ==='employee_gather')) {
        return <ViewReceipt />;
      } else if (path === 'outgoingForm/:packageId' && (role ==='employee_exchange' || role ==='employee_gather')) {
        return <OutgoingForm role = {role}/>;
      } else if (path === 'incomingForm/:packageId' && (role ==='employee_exchange' || role ==='employee_gather')) {
        return <IncomingForm role = {role}/>;
      } else if (path === 'incomingPackages' && (role ==='employee_exchange' || role ==='employee_gather')) {
        return <IncomingPackages />;
      } else if (path === 'outgoingPackages' && (role ==='employee_exchange' || role ==='employee_gather')) {
        return <OutgoingPackages />;
      } else if (path === 'newuser' && role ==="ceo") {
        return < CEORegister inputs={CeoUserInputs} title="Add New User"/>;
      } else if (path === 'newuser' && (role ==='manager_exchange' || role ==='manager_gather')) {
        return <New inputs={userInputs} title="Add New User"/>;
      } else if (path === 'newgathering' && role ==='ceo') {
        return <NewGathering inputs={gatheringInputs} title="Add new gathering"/>;
      } 
      return <App />; // Unauthorized for the given path and role
    };

    useEffect(() =>{
      const authorized = checkPermission(path, role);
      setAuthorizedComponent(authorized);
    },[path, role])
    return authorizedComponent;
};

export default Authorization;
