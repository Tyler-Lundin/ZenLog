'use client';


export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Page({ children, className, ...props }: PageProps) {
  return (
    <main
      {...props}
      style={{
        backgroundImage: ` radial-gradient(rgb(${isDark ? "255,255,255" : "0,0,0"}) 1px, rgba(${isDark ? "255,255,255" : "0,0,0"}) 1px)`,
        backgroundSize: '45px 45px',
        backgroundPosition: '0 0, 14px 14px',
      }}
      className={`min-h-screen md:p-6 lg:p-8 bg-white dark:bg-black w-screen relative ${className} `}>
      <div className="h-16" />
      {children}
    </main>
  )
}
