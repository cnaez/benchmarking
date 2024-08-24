import SalaryChart from "../components/SalaryChart";
import CubeChart from "../components/CubeChart";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">HR Analytics Dashboard</h1>

      <SalaryChart />
      <CubeChart />
    </div>
  );
}
