import React from 'react'
import IncomingPackages from "./IncomingPackages";
import OutgoingPackages from "./OutgoingPackages";
import { useEffect, useState } from 'react';
import axiosInstance from '../axios/Instance';
import EmployeeNavbar from "../../components/navbar/AdminNav";
function EmployeeGather() {
  return (
    <div>
      <EmployeeNavbar role="/employeeGather"/>

      <div>
        <IncomingPackages role="employeeGather"/>
      </div>
      <div>
        <OutgoingPackages role="employeeGather"/>
      </div>
      
    </div>
    
  )
}

export default EmployeeGather