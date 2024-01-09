import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  chartData: {
    name: string;
    count: number;
    color: string;
  }[];
}

export function EngagmentChart({ chartData }: Props) {
  const footer = (tooltipItems: any) => {
    let total = 0;
    let currentValue = 0;
    tooltipItems.forEach(function (tooltipItem: any) {
      let sum = 0;
      tooltipItem.dataset.data.forEach((data: any) => {
        sum += data;
      });
      total = sum;
      currentValue = tooltipItem.parsed;
    });
    return ((currentValue * 100) / total).toFixed(1) + "%";
  };

  const options = {
    responsive: true,
    plugins: {
      ChartDataLabels,
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(1) + "%";
          if ((value * 100) / sum < 10) {
            return "";
          }
          return percentage;
        },
        color: "#fff",
        font: {
          size: 12,
        },
      },
      tooltip: {
        callbacks: {
          footer: footer,
        },
      },
    },
  };

  const data = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        label: "Número de Votos",
        data: chartData.map((item) => item.count),
        backgroundColor: chartData.map((item, index) => item.color),
        borderWidth: 5,
        borderColor: "#fff",
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={options}
      style={{ width: "100%" }}
      height={"100%"}
    />
  );
}
