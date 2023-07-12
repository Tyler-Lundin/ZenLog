import Page from "@/components/Page";
import DailyCheck from "@/components/dashboard/DailyCheck2";
import DashboardStats from "@/components/dashboard/DashboardStats";
import LogButton from "@/components/dashboard/LogButton";
import LogEntryMenu from "@/components/dashboard/LogEntryMenu";
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
        <LogEntryMenu />
        <footer className="h-20 grid place-content-center ">
          <a href="https://tylerlundin.me" target="_blank" rel="noopener noreferrer" className="text-gray-500 whitespace-nowrap">Created by Tyler</a>
        </footer>
      </div>
    </Page>
  )
}

