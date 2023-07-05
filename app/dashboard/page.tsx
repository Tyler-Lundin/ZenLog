import Page from "@/components/Page";
import DailyCheck from "@/components/dashboard/DailyCheck";
import DashboardStats from "@/components/dashboard/DashboardStats";
import LogButton from "@/components/dashboard/LogButton";
import LogEventMenu from "@/components/dashboard/LogEventMenu";
import { authOptions } from "@server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/')
  return (
    <Page>
      <LogButton />
      <div className="grid gap-4">
        <DailyCheck />
        <DashboardStats />
        {/* @ts-expect-error */}
        <LogEventMenu />
        <footer className="h-20">

        </footer>
      </div>
    </Page>
  )
}

