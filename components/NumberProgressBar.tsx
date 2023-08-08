import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React from "react";

const strokeWidth = 6;

export default function NumberProgressBar({
  value,
  label,
  goal,
  pathColor = "rgba(180, 125, 155)",
  trailColor = "rgba(100,100,100,0.5)"
}: {
  value: number,
  label: string,
  goal: number,
  pathColor?: string,
  trailColor?: string
}) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      maxValue={goal}
      strokeWidth={strokeWidth}
      styles={buildStyles({
        strokeLinecap: "round",
        pathColor,
        trailColor,
        pathTransitionDuration: 1,
      })}
    >
      <div className="flex justify-between text-sm">
        <span>{value}</span>
        <span>/</span>
        <span>{goal}</span>
      </div>
      <h4 className="text-sm font-bold">{label}</h4>
    </CircularProgressbarWithChildren>
  )
}

