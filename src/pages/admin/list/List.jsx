import "../../../assets/css/List.min.css"
import Sidebar from "../../../components/sidebar/Sidebar.jsx"
import AdminNav from "../../../components/navbar/AdminNav.jsx"
import Datatable from "../../../components/datatable/Datatable.jsx"
import { userColumns, userRows } from "../../../assets/data/UserData.js"
import { useState, useEffect } from "react"
import axiosInstance from "../../axios/Instance.js"

const List = (props) => {
  const [data,setData] = useState(userRows);
    const manageEmployee = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/manageEmployee');
      setData(response.data.employee); // Set the retrieved package data
      
    } catch (error) {
        console.log(error);
    }
  };
  useEffect (()=> {
    manageEmployee()
  },[]);
  return (
    <div className="list">
      <Sidebar role= {props.role}/>
      <div className="listContainer">
        <AdminNav/>
        <Datatable dataRows={data} dataColumns={userColumns} object ="user"/>
      </div>
    </div>
  )
}

export default List