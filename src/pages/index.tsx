import { trpc } from "../../utils/trpc";
import Chart from "@/components/Chart";

export default function Home() {
  const { data, isLoading, error } = trpc.getAllBenchmarks.useQuery();
  const {
    data: dataByLabel,
    isLoading: isLoadingByLabel,
    error: errorByLabel,
  } = trpc.getBenchmarks.useQuery({
    metric: "People",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p>No data available</p>;

  return (
    <div>
      <h1>Benchmark Data</h1>
      <Chart metrics={data} />
      {data.map((item, index) => (
        <p key={index}>
          {item.metric}: {item.value}
        </p>
      ))}
    </div>
  );
}
