import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { Container } from "./styles";

interface Props {
  data: {
    name: string;
    count: number;
  }[];
}

export function FollowerData({ data }: Props) {
  let sortedData = data.sort((a, b) => b.count - a.count);

  const [myChart, setMyChart] = useState<any>(null);

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

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

    const labels = data.map((d) => d.name);

    const sliceThickness = {
      id: "sliceThickness",
      beforeDraw(chart: any, plugins: any) {
        const chart_width = chart.getDatasetMeta(0).data[0].outerRadius;
        let sliceThicknessPixels = [
          456 * (1 - 40 / 100),
          456 * (1 - 30 / 100),
          456 * (1 - 20 / 100),
          456 * (1 - 10 / 100),
        ];

        sliceThicknessPixels.forEach((d, i) => {
          chart.getDatasetMeta(0).data[i].outerRadius =
            (chart.chartArea.width / (window.innerWidth <= 300 ? d * 2 : d)) *
            100;
        });
      },
    };

    const newChart = new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Quantidade",
            data: data.map((d) => d.count),
            backgroundColor: ["#2F5CFC", "#0A2BA0", "#000411", "#E5E8F0"],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "36%",
        maintainAspectRatio: false,
        offset: 10,
        plugins: {
          legend: {
            display: false,
            position: "right" as const,
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
            color: ["#fff", "#fff", "#fff", "#000"],
          },
          tooltip: {
            callbacks: {
              footer: footer,
            },
          },
        },
      },
      plugins: [sliceThickness],
    });

    setMyChart(newChart);

    // Clean up the chart on component unmount
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, []);

  return (
    <Container>
      <canvas id="myChart" style={{ width: "100%", height: "100%" }} />
    </Container>
  );
}
