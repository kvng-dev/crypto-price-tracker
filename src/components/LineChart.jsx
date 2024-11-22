import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((price) => {
        dataCopy.push([
          `${new Date(price[0]).toLocaleDateString().slice(0, -5)}`,
          price[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: "Crypto Prices",
        colors: ["crimson"],
        hAxis: { title: "Date", type: "date" },
        vAxis: { title: "Price" },
        legend: { position: "top-right" },
      }}
      rootProps={{ "data-testid": "chart" }}
    />
  );
};
export default LineChart;
