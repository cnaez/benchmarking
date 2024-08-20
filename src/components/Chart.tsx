import "chart.js/auto";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

interface IMetrics {
  metric: string;
  value: number;
  id: number;
  createdAt: string;
}

interface IMetricsProps {
  metrics: IMetrics[];
}

const Chart: FC<IMetricsProps> = ({ metrics }) => {
  const chartData = {
    labels: metrics.map((item: any) => item.metric),
    datasets: [
      {
        label: "Value",
        data: metrics.map((item: any) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={chartData} />;
};

export default Chart;
