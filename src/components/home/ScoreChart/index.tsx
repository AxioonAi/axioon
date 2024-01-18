import Chart from "chart.js/auto";
import { useState, useEffect, useRef } from "react";

interface Props {
  score: number;
  id: string;
}

export function ScoreChart({ score, id }: Props) {
  let chartWidth: any;
  const canvasRef = useRef(null);
  let gradientSegment: any;
  const [canvas, setCanvas] = useState<any>();

  let myChart: any;

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

    const chartBox = document.querySelector(".chartBox");

    setCanvas(document.getElementById(id) as HTMLCanvasElement);

    let ctx: any;

    if (canvas) {
      ctx = canvas.getContext("2d");
      if (chartBox) {
        chartWidth = chartBox.getBoundingClientRect().width;
      }
      gradientSegment = ctx.createLinearGradient(0, 0, chartWidth, 0);
      gradientSegment.addColorStop(0, "red");
      gradientSegment.addColorStop(0.5, "yellow");
      gradientSegment.addColorStop(1, "green");
    }

    const gaugeChartText = {
      id: "gaugeChartText",
      afterDatasetDraw(chart: any, args: any, pluginOptions: any) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
          scales: { r },
        } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        let rating = "";

        if (score < 150) rating = "Extremamente negativo";
        if (score >= 150 && score < 300) rating = "Negativo";
        if (score >= 300 && score < 700) rating = "Neutro";
        if (score >= 700 && score < 850) rating = "Positivo";
        if (score >= 850) rating = "Extremamente positivo";

        function textLabel(
          text: string,
          x: any,
          y: any,
          fontSize: any,
          textBaseLine: any,
          textAlign: any
        ) {
          ctx.font = `${fontSize}px sans-serif`;
          ctx.fillStyle = "#292D32";
          ctx.textBaseLine = textBaseLine;
          ctx.textAlign = textAlign;
          ctx.fillText(text, x, y);
        }

        // textLabel("100", left, yCoor + 13, 15, "top", "left");
        // textLabel("1000", right, yCoor + 13, 15, "bottom", "right");
        textLabel(score.toString(), xCoor, yCoor - 28, 40, "top", "center");
        textLabel(rating, xCoor, yCoor - 10, 13, "center", "bottom");
      },
    };

    const newChart = new Chart(id, {
      type: "doughnut",
      data: {
        labels: ["teste"],
        datasets: [
          {
            label: "Quantidade",
            data: [score - 100, score - 1000],
            backgroundColor: [gradientSegment, "rgba(0, 0, 0, 0.2)"],
          },
        ],
      },
      options: {
        aspectRatio: 3,
        responsive: true,
        cutout: "80%",
        circumference: 180,
        rotation: 270,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: false,
          },
        },
      },
      plugins: [gaugeChartText],
    });

    myChart = newChart;

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [score, canvas]);

  return (
    <div className="chartBox">
      <canvas ref={canvasRef} id={id} />
    </div>
  );
}
