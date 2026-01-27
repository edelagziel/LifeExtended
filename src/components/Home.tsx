import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import StatCard from "./StatCard";


type StatsData = {
  riskScore: number;
  load: number;
  fatigue: number;
  crashRisk: number;
  stability: number;
};

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const [data] = useState<StatsData>({
    riskScore: 4,
    load: 3,
    fatigue: 2,
    crashRisk: 1,
    stability: 5,
  });

  const cards = [
    { title: "Load", value: data.load, description: "Metabolic load" },
    { title: "Fatigue", value: data.fatigue, description: "Energy level" },
    { title: "Crash Risk", value: data.crashRisk, description: "Risk of burnout" },
    { title: "Stability", value: data.stability, description: "Overall stability" },
  ];

  return (
    <div
      style={{
        background: mode === "dark" ? "#222" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
        padding: "1rem",
      }}
    >
      <h1>Today's Overview ({mode})</h1>

      {cards.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default Home;
