
export default function Minimizer({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <details open className="border text-black dark:text-white border-white dark:border-black relative rounded-md">
      <summary className="p-2 cursor-pointer text-2xl">{title}</summary>
      <div className="p-2">{children}</div>
    </details>
  )
}
