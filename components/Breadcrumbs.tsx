'use client'

import Link from "next/link"


export type Breadcrumb = {
  title: string,
  href?: string,
  onClick?: () => void
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {

  return (
    <div className="flex gap-1 items-center p-1">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <div key={`breadcrumb-${index}`} className="flex items-center gap-1 z-40 text-black dark:text-white">
            {breadcrumb.href ? (
              <Link href={breadcrumb.href} className="text-xs font-thin hover:underline">{breadcrumb.title}</Link>
            ) : (
              <span className="text-sm font-thin">{breadcrumb.title}</span>
            )}
            {index !== breadcrumbs.length - 1 && <small className="text-xs font-thin">/</small>}
          </div>
        )
      })}
    </div>
  )
}
