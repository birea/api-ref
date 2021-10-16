import React from "react";
import Chart from "react-apexcharts";

const CandleChart = (props) => {
  let options = {
    title: {
      text: "CandleStick Chart",
      align: "left"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  let series = [];
  series.push({ data: props.candleData });
  if (props.candleData === []) {
    return "Loading";
  } else {
    return (
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height="350"
      />
    );
  }
};

export default CandleChart;
