import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React, { StyleHTMLAttributes } from "react";
import _ from "lodash";

const strokeWidth = 6;

function Separator(props: { turns: number, style: any }) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`
      }}
    >
      <div style={props.style} />
    </div>
  );
}

function RadialSeparators(props: { count: number }) {
  const turns = 1 / props.count;
  return (
    <>
      {_.range(props.count).map((i: number, index: number) => (
        <Separator key={index} turns={i * turns}
          style={{
            background: "#fff",
            width: "3px",
            height: `${strokeWidth}%`
          }}
        />
      ))}
    </>
  );
}

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

