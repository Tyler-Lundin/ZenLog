'use client'


export type Breadcrumb = {
  title: string,
  href?: string,
  onClick?: () => void
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {

  return (
    <div>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <div key={`breadcrumb-${index}`} className="flex items-center gap-1 z-40 bg-red-400">
            {breadcrumb.href ? (
              <a href={breadcrumb.href} className="text-sm font-thin hover:underline">{breadcrumb.title}</a>
            ) : (
              <span className="text-sm font-thin">{breadcrumb.title}</span>
            )}
            {index !== breadcrumbs.length - 1 && <span className="text-sm font-thin">/</span>}
          </div>
        )
      })}
    </div>
  )
}
