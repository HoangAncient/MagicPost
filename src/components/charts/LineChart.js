// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import '../../assets/css/LineChart.min.css'
function LineChart({ chartData }) {
  return (
    <div className="lineChart">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Package sent in this month"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;