// App.js
import ChartJS from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import PieChart from "../../../components/charts/PieChart";
import BarChart from "../../../components/charts/BarChart";
import LineChart from "../../../components/charts/LineChart";
import MapComponent from "../../../components/MapComponent";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNav from "../../../components/navbar/AdminNav";
import Widget from "../../../components/widget/Widget";
import "../../../assets/css/AdminHome.min.css";
import Featured from "../../../components/featured/Featured";
import Table from "../../../components/table/Table";
import axiosInstance from "../../axios/Instance";

ChartJS.register(CategoryScale);

export default function App() {
  const [chartPieData, setChartPieData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity",
        data: [],
        backgroundColor: [
          "rgba(255, 206, 86, 1)", // Yellow color (initially for "Success")
          "rgba(54, 162, 235, 1)", // Blue color (initially for "Shipping")
          "rgba(255, 99, 132, 1)", // Red color (initially for "No receive")
          "rgba(75, 192, 192, 1)", // Additional color
          // Add more colors if needed
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          // Add more colors if needed
        ],
        borderWidth: 0,
      },
    ],
  });

  const getData = async () => {
    try {
      // const pointId = "656c988ebf49906c73906a99"; // pointID demo
      const time = "start=2023-01-01&end=2023-12-31";
      const response = await axiosInstance.get(
        "/api/auth/all_packages?" + time
      );

      const transformedPieData = response.data.pieData.map(
        ({ name, quantity }) => ({
          name: name.replace(/Count$/, ""), // Removing 'Count' from the name
          quantity,
        })
      );
      setChartPieData({
        labels: transformedPieData.map((data) => data.name),
        datasets: [
          {
            label: "Quantity",
            data: transformedPieData.map((data) => data.quantity),
            backgroundColor: chartPieData.datasets[0].backgroundColor.slice(
              0,
              transformedPieData.length
            ), // Using existing colors or add more as needed
            borderColor: chartPieData.datasets[0].borderColor.slice(
              0,
              transformedPieData.length
            ), // Using existing colors or add more as needed
            borderWidth: 0,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //---------------------------------------------- end Pie chart
  const [LineData, setLineData] = useState([]);
  const getlineData = async () => {
    try {
      const time = "2023";
      const response = await axiosInstance.get(
        "/api/auth/all_packages/" + time
      );
      console.log(response.data.data);
      setLineData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getlineData();
  }, []);

  const [chartLineData, setChartLineData] = useState();
  useEffect(() => {
    // Update chartLineData when LineData changes
    setChartLineData({
      labels: LineData.map((data) => data.month),
      datasets: [
        {
          label: "package sent",
          data: LineData.map((data) => data.packageSent),
          backgroundColor: "rgba(54, 162, 235, 1)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [LineData]); // Trigger when LineData changes
  //------------------------- end Line chart

  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/recent_packages/");
      console.log(response.data.packages);
      setTableData(response.data.packages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTableData();
  }, []);
  useEffect(() => {
    const toggleBtn = document.getElementsByClassName("toggle-button")[0];
    const navbarLinks = document.getElementsByClassName("sidebar")[0];
    const blur = document.getElementsByClassName("blurPart")[0];
    
    console.log(toggleBtn);
    toggleBtn.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
      blur.classList.toggle("active");
    });
    blur.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
      blur.classList.toggle("active");
    });
  }, []);
  return (
    <div className="Home">
      <Sidebar />
      <div className="homeContainer">
        <div className="blurPart"></div>
        <AdminNav />
        <div className="widgets">
          <Widget type="employee" role="ceo" />
          <Widget type="gathering" role="ceo" />
          <Widget type="exchange" role="ceo" />
        </div>
        <div className="charts">
          {/* 
            <LineChart chartData={chartLineData} />
           */}
          <BarChart chartData={chartLineData} />
          <div className="pie">
            <PieChart chartData={chartPieData} />
            <Featured />
          </div>

          {/* <div className="map">
            <iframe
              title="ban do"
              src="https://www.google.com/maps/d/u/0/embed?mid=1vcqGyBPA_8ijgcMeB8czvNP4rTrmWB8&ehbc=2E312F"
              width="480"
              height="480"
            ></iframe>
          </div> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent packages</div>
          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
}
