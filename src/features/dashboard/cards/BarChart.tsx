import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type TDatasets = {
  label: string;
  data: number[] | undefined;
  borderColor: string;
  backgroundColor: string;
};

type BarChartProps = {
  monthWiseRevenue: number[] | undefined;
};

const BarChart = ({ monthWiseRevenue }: BarChartProps) => {
  const datasets: TDatasets[] = [];
  const labels: string[] = [];
  const [chartData, setChartData] = useState({
    labels,
    datasets,
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales $",
          data: monthWiseRevenue,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [monthWiseRevenue]);

  return (
    <div className="w-full relative p-4 border rounded-lg bg-white  lg:h-[70vh] h-[50vh]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
