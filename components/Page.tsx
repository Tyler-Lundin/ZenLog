'use client';

import Background from "./Background";


export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Page({ children, className, ...props }: PageProps) {
  return (
    <main
      {...props}
      className={`min-h-screen md:p-6 lg:p-8 w-screen relative ${className} `}>
      <div className="h-16" />
      <Background />
      {children}
    </main>
  )
}
