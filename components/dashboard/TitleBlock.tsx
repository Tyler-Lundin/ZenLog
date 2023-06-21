import DashboardBlock from "./DashboardBlock";


export default function TitleBlock({ title, children, className }: { title: string, children?: React.ReactNode, className?: string }) {

  return (

    <div className={`${className} flex w-full items-center left-0 top-0 gap-4 mt-16 bg-white dark:bg-black h-16 p-6`}>
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      {children}
    </div>
  )
}
