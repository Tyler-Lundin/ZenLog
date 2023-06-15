import DashboardBlock from "./DashboardBlock";


export default function TitleBlock({ title, children }: { title: string, children?: React.ReactNode }) {

  return (
    <DashboardBlock>
      <div className="flex w-full items-center gap-4">
        <h1 className="text-xl font-black dark:text-white">{title}</h1>
        {children}
      </div>
    </DashboardBlock>
  )
}
