import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

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
        label: "Engajamento",
        data: chartData.map((item) => item.count),
        backgroundColor: chartData.map((item) =>
          item.name === "Instagram"
            ? "#6A45BE"
            : item.name === "Facebook"
              ? "#2F5CFC"
              : item.name === "Youtube"
                ? "#E73F3F"
                : "#29282C",
        ),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };
  return (
    <div className="sm:h-96 md:h-52 xl:h-60 2xl:h-68 self-center">
      <Pie
        data={data}
        options={options}
        style={{ width: "100%" }}
        height={"100%"}
      />
    </div>
  );
}
