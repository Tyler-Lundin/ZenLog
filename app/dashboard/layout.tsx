import Providers from "@/components/Providers"
import DateBlock from "@/components/dashboard/DateBlock"
import Navigation from "@/components/navigation/Navigation"


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <>
      {/* @ts-expect-error promise element*/}
      <Navigation />
      {children}
    </>
  )
}
