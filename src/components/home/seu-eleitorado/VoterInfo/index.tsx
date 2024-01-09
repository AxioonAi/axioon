import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  chartData: [];
  labels?: string[];
}

export const footer = (tooltipItems: any) => {
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

export function VotersInfo({ chartData, labels }: Props) {
  const options = {
    responsive: true,
    plugins: {
      ChartDataLabels,
      legend: {
        labels: {
          usePointStyle: true,
        },
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
    labels: labels,
    datasets: [
      {
        label: "Número de eleitores",
        data: chartData,
        backgroundColor: [
          "#E7298A",
          "#1B9E77",
          "#A6761D",
          "#66A61E",
          "#D95F02",
          "#66A61E",
          "#666666",
        ],
        borderWidth: 5,
        borderColor: "#fff",
      },
    ],
  };

  return <Pie data={data} options={options} />;
}
