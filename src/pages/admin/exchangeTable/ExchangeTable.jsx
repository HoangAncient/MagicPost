// import "../../../assets/css/ExchangeTable.min.css";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import AdminNav from "../../../components/navbar/AdminNav.jsx";
import Datatable from "../../../components/datatable/Datatable.jsx";
import {useState, useEffect} from "react"
import axiosInstance from "../../axios/Instance.js";
import { useParams } from "react-router-dom";

const ExchangeTable = () => {
  const {gatherId} = useParams();
  console.log(gatherId);
   const exchangeColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Exchange",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
    },

    {
      field: "created_date",
      headerName: "Create time",
      width: 100,
    },
    {
      field: "managerName",
      headerName: "ManagerName",
      width: 100,
    },
  ];

  //temporary data

// const gatherRows = [];
  const [data, setData] = useState([]);
  const manageGather = async () => {
    try {
      const response = await axiosInstance.get(`/api/auth/get_exchange_by_gather/`+gatherId);
      console.log(response.data);
      setData(response.data.gathering); // Set the retrieved package data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    manageGather(); // Call the manageEmployee function when the component mounts
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <AdminNav />
        <Datatable dataRows={data} dataColumns={exchangeColumns} object="exchange"/>
      </div>
    </div>
  );
};

export default ExchangeTable;
