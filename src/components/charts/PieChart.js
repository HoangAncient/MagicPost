// src/components/PieChart.js
import React from "react";
import ChartJS from "chart.js/auto";
import "../../assets/css/PieChart.min.css";
import { useEffect } from "react";

const PieChart = ({ chartData }) => {
  useEffect(() => {
    // setup
    console.log(chartData);
    // config
    const config = {
      type: "pie",
      data: chartData,
      options: {
        plugins: {
          title: {
            display: false,
            text: "Package status rate chart",
          },
        },
        responsive: true,
      },
    };
    // render init block
    const myChart = new ChartJS(document.getElementById("myChart"), config);

    return () => {
      myChart.destroy();
    };
  }, [chartData]); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  return (
    <div className="pieChart">
      <div className="title">Package status rate in 2023</div>
      <div className="pieContainer">
        <div className="chartbody">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
