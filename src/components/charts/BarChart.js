// components/BarChart.js
import React, { useEffect } from "react";
import ChartJS from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "../../assets/css/BarChart.min.css";
function BarChart({ chartData }) {
  useEffect(() => {
    console.log(1);
    const config = {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          title: {
            display: false,
            text: "Package status rate chart",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
    // var ctx = document.getElementById("barChart").getContext('2d');
    // ctx.height = 1000;
    const myChart = new ChartJS(document.getElementById("barChart"), config);

    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="barChart">
      <h2 className="title">Package in 2023</h2>
      <div className="barchartBox">
        <canvas id="barChart"></canvas>
      </div>
    </div>
  );
}
export default BarChart;
