'use client';
import { useTheme } from "next-themes"


export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Page({ children, className, ...props }: PageProps) {
  return (
    <main
      {...props}
      style={{
        backgroundImage: ` radial-gradient(rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 1px)`,
        backgroundSize: '45px 45px',
        backgroundPosition: '0 0, 14px 14px',
      }}
      className={`min-h-screen p-4 md:p-6 lg:p-8 bg-white/80 dark:bg-black/80 w-screen relative ${className} `}>
      <div className="h-16" />
      {children}
    </main>
  )
}

// export default function Page({ children, className, ...props }: PageProps) {
//
//   return (
//     <main
//       {...props}
//       className={`min-h-screen p-4 md:p-6 lg:p-8 w-screen relative ${className} `}>
//       {children}
//     </main>
//   )
// }
