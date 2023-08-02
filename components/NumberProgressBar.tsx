import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

export default function NumberProgressBar({ value, label, goal }: { value: number, label: string, goal: number }) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      strokeWidth={10}
      styles={buildStyles({
        pathColor: `rgba(255, 255, 255, ${value / goal})`,
        textColor: '#fff',
        trailColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      })}
    >
      <div className=" text-gray-400">
        <h4 className="text-md font-bold">REPS</h4>
        <div className="flex justify-between">
          <span>{value}</span>
          <span>/</span>
          <span>{goal}</span>
        </div>
      </div>
    </CircularProgressbarWithChildren>
  )
}
