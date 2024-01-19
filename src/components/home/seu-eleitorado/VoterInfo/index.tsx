import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  chartData: [];
  labels?: string[];
  position?: "left" | "right" | "top" | "bottom";
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

export function VotersInfo({ chartData, labels, position }: Props) {
  const options = {
    responsive: true,
    plugins: {
      ChartDataLabels,
      legend: {
        display: false,
        position: position || "right",
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
        label: "",
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
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-full h-72 sm:h-96 md:h-80 xl:h-60 2xl:h-68 self-center">
      <Pie
        data={data}
        options={options}
        style={{ height: "100%" }}
        height={"100%"}
      />
    </div>
  );
}
