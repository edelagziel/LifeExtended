import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store.js";
import { setFontSize } from "../store/themeSlice.js";
import StatCard from "./StatCard.js";

// טיפוס לנתונים של הסטטיסטיקות
type StatsData = {
  riskScore: number;
  load: number;
  fatigue: number;
  crashRisk: number;
  stability: number;
};

function Home() {
  // --- Redux ---
  const dispatch = useDispatch();
  const fontSize = useSelector((state: RootState) => state.theme.fontSize);
  const mode = useSelector((state: RootState) => state.theme.mode);

  // --- Local state ---
  const [data, setData] = useState<StatsData>({
    riskScore: 4,
    load: 3,
    fatigue: 2,
    crashRisk: 1,
    stability: 5,
  });

  const cards = [
    {
      title: "Load",
      value: data.load,
      description: "Metabolic load",
    },
    {
      title: "Fatigue",
      value: data.fatigue,
      description: "Energy level",
    },
    {
      title: "Crash Risk",
      value: data.crashRisk,
      description: "Risk of burnout",
    },
    {
      title: "Stability",
      value: data.stability,
      description: "Overall stability",
    },
  ];

  return (
    <div
      style={{
        fontSize,
        background: mode === "dark" ? "#222" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
        padding: "1rem",
      }}
    >
      <h1>Today's Overview ({mode})</h1>

      <button onClick={() => dispatch(setFontSize(fontSize + 2))}>
        Increase Font Size
      </button>

      {cards.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default Home;
