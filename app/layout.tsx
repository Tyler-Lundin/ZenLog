import Providers from '@/components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zen Log',
  description: 'A simple, beautiful, and free journal for your daily life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen overflow-x-hidden bg-white dark:bg-black`}>
        <Analytics />
        <Providers>
          <div className=" min-h-screen w-screen overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
