import React,{useState} from "react";
import axios from "axios";
import StatCard from "./StatCard";


function Home()
{
    const [data,setData]=useState({
        riskScore: 4,
        load: 3,
        fatigue: 2,
        crashRisk: 1,
        stability: 5})


const cards = [
  {
    title: "Load",
    value: data.load,
    description: "Metabolic load"
  },
  {
    title: "Fatigue",
    value: data.fatigue,
    description: "Energy level"
  },
  {
    title: "Crash Risk",
    value: data.crashRisk,
    description: "Risk of burnout"
  },
  {
    title: "Stability",
    value: data.stability,
    description: "Overall stability"
  }
];

    return (
        <>
            <h1>Today's Overview</h1>
            {
                cards.map((item,index)=>{

                    return <StatCard key={index} title={item.title} value={item.value} description={item.description}/>
                }

                )
            }
        </>
    )
}



export default Home;