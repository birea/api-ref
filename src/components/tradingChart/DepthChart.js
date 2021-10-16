import React from "react";
import Chart from "react-apexcharts";

function getCumulativeData(data) {
  let newdata = [];
  let cumulative = 0;
  for (let item = 0; item < 20; item++) {
    cumulative = cumulative + Number(data[item][1]);
    newdata.push({
      x: Number(data[item][0]),
      y: cumulative
    });
  }
  return newdata;
}

const DepthChart = (props) => {
  let options = {
    labels: ["Bids", "Asks"],
    title: {
      text: "Depth Chart",
      align: "left"
    },
    xaxis: {
      type: "numeric",
      labels: {
        formatter: function (val, index) {
          return val.toPrecision(6);
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: function (val, index) {
          return Math.floor(val);
        }
      },
      tickAmount: 2
    },
    stroke: {
      curve: "stepline"
    },
    dataLabels: {
      enabled: false
    }
  };
  let data2 = getCumulativeData(props.book["asks"]);
  let data1 = getCumulativeData(props.book["bids"]);
  let series = [];
  series.push({ title: "Bids", data: data1 });
  series.push({ title: "Asks", data: data2 });
  return <Chart options={options} series={series} type="area" height="350" />;
};

export default DepthChart;
