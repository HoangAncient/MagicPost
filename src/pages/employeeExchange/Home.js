import React from "react";
import IncomingPackages from "../employeeGather/IncomingPackages";
import OutgoingPackages from "../employeeGather/OutgoingPackages";
import PieChart from "../../components/charts/PieChart";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/Instance";
import EmployeeNavbar from "../../components/navbar/AdminNav";
function EmployeeExchange() {
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
  return (
    <div>
      <EmployeeNavbar role="employeeExchange" />
      <div style={{marginTop: "20px"}}>
        <PieChart chartData={chartPieData} />
      </div>
      <div className="tableContainer">
        <div>
          <IncomingPackages role="employeeExchange" />
        </div>
        <div>
          <OutgoingPackages role="employeeExchange" />
        </div>
      </div>
    </div>
  );
}

export default EmployeeExchange;
