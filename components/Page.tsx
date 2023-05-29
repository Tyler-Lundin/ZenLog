'use client';
import { useTheme } from "next-themes"


export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Page({ children, className, ...props }: PageProps) {
  const { systemTheme } = useTheme();
  let bgColor = systemTheme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  let dotColor = systemTheme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
  return (
    <main
      {...props}
      style={{
        backgroundImage: ` radial-gradient(${dotColor} 0.75px, ${bgColor} 0.7px)`,
        backgroundSize: '45px 45px',
        backgroundPosition: '0 0, 14px 14px',
      }}
      className={`min-h-screen p-4 md:p-6 lg:p-8 w-screen relative ${className} `}>
      {children}
    </main>
  )
}
