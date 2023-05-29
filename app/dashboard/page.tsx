import Page from "@/components/Page";
import DateBlock from "@/components/dashboard/DateBlock";
import LogButton from "@/components/dashboard/LogButton";
import LogEventMenu from "@/components/dashboard/LogEventMenu";
import StatsOverview from "@/components/dashboard/StatsOverview";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import Link from "next/link";


export default function DashboardPage() {
  return (
    <Page>
      <div className="h-16" />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <DateBlock />
        <WelcomeBanner />
        <StatsOverview />
      </div>
      <Link href="/dashboard/exercise"> Exercise </Link>
      <span className="p-4 w-full grid place-content-center">
        <LogButton />
        <LogEventMenu />
      </span>
    </Page>
  )
}
