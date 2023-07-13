import Page from "@/components/Page";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic'

const DynamicLogEntryMenu = dynamic(() => import('../../components/dashboard/LogEntryMenu'), {
  loading: () => <p>Loading...</p>,
})

const DynamicLogButton = dynamic(() => import('../../components/dashboard/LogButton'), {
  loading: () => <p>Loading...</p>,
})

const DynamicDailyEntries = dynamic(() => import('../../components/dashboard/DailyEntries'), {
  loading: () => <p>Loading...</p>,
})


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');
  return (
    <Page>
      <DynamicLogButton />
      <div className="grid gap-4">
        <DynamicDailyEntries />
        <DashboardStats />
        <DynamicLogEntryMenu />
        <footer className="h-20 grid place-content-center ">
          <a href="https://tylerlundin.me" target="_blank" rel="noopener noreferrer" className="text-gray-500 whitespace-nowrap">Created by Tyler</a>
        </footer>
      </div>
    </Page>
  )
}

