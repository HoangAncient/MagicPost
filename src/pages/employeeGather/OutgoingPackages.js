import "../../../src/assets/css/List.min.css"
import Packagetable from "./PackageTable.js"
import { packageColumns } from "../../assets/data/PackageData.js"
import { useState, useEffect } from "react"
import axiosInstance from "../axios/Instance.js"

const ListPackage = () => {
  const [data,setData] = useState([]);
    const manageEmployee = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/packages/queued/outgoing');
      setData(response.data.OutgoingQueuedPackages); // Set the retrieved package data
      
    } catch (error) {
        console.log(error);
    }
  };
  useEffect (()=> {
    manageEmployee()
  },[]);
  return (
    <div className="list">
      <div className="listContainer">
        <Packagetable dataRows={data} dataColumns={packageColumns} object ="Outgoing"/>
      </div>
    </div>
  )
}

export default ListPackage