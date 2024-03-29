import { forwardRef } from "react";


interface DashboardBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DashboardBlock = forwardRef<HTMLDivElement, DashboardBlockProps>(({ children, ...props }, ref) => {

  return (
    <div ref={ref} {...props} className="w-full shadow-gray-400 dark:shadow-none shadow-sm relative rounded-lg grid p-4 bg-white/80 border dark:border-black border-white dark:bg-black/80 place-items-center" >
      {children}
    </div>
  )
})

DashboardBlock.displayName = 'DashboardBlock';

export default DashboardBlock;
