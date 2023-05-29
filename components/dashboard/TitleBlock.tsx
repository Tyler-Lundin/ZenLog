import DashboardBlock from "./DashboardBlock";


export default function TitleBlock({ title }: { title: string }) {

  return (
    <DashboardBlock>
      <h1 className="text-4xl font-black dark:text-white">{title}</h1>
    </DashboardBlock>
  )
}
