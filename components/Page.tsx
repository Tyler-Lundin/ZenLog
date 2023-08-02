'use client';

import Background from "./Background";


export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  isOffset?: boolean
}

export default function Page({ children, className, isOffset, ...props }: PageProps) {
  return (
    <main
      {...props}
      className={`min-h-screen w-screen relative ${className} `}>
      {isOffset && <div className="h-16" />}
      <Background />
      {children}
    </main>
  )
}
