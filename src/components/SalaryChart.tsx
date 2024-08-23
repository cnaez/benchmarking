import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { trpc } from "../../utils/trpc";

const SalaryChart = () => {
  const { data, isLoading, error } = trpc.employee.getAllEmployees.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No data available</p>;

  const chartData = {
    labels: data?.map((emp) => `${emp.firstName} ${emp.lastName}`),
    datasets: [
      {
        label: "Salary",
        data: data?.map((emp) =>
          emp.salaries.length > 0 ? emp.salaries[0].salaryAmount : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const reviewsData = {
    labels: data?.map((emp) => `${emp.firstName} ${emp.lastName}`),
    datasets: [
      {
        label: "Reviews",
        data: data?.map((emp) =>
          emp.salaries.length > 0 ? emp.reviews[0].rating : 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex gap-10">
      <Line data={chartData} />
      <Bar data={reviewsData} />
    </div>
  );
};

export default SalaryChart;
