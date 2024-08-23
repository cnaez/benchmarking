import SalaryChart from "../components/SalaryChart";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">HR Analytics Dashboard</h1>
      {/* <CustomButton /> */}
      <SalaryChart />
    </div>
  );
}
