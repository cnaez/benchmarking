import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const SalaryChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/cubejs-api/v1/load",
          {
            params: {
              query: JSON.stringify({
                measures: ["Employee.averageSalary"],
                dimensions: ["Employee.firstName", "Employee.lastName"],
                // filters: [
                //   {
                //     dimension: "Employee.departmentId",
                //     operator: "equals",
                //     values: ["1"].toString(),
                //   },
                // ],
              }),
            },
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_CUBEJS_TOKEN}`,
            },
          }
        );

        const data = response.data.data;

        setChartData({
          labels: data.map(
            (emp) => `${emp["Employee.firstName"]} ${emp["Employee.lastName"]}`
          ),
          datasets: [
            {
              label: "Average Salary",
              data: data.map((emp) => emp["Employee.averageSalary"]),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return <Line data={chartData} />;
};

export default SalaryChart;
