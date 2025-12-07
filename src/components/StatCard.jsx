import { useState } from "react";
import "./StatCard.css";

function StatCard({title ,value,description})
{
    console.log({title ,value,description})
    return(
        <div className="stat-card" >
            <h2>{title}</h2>
            <h3>{value}</h3>
            <p>{description}</p>
        </div>
    )
}

export default StatCard;


