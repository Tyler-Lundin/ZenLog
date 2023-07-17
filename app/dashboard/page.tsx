import DashboardStats from "@/components/dashboard/DashboardStats";
import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogButton from "../../components/dashboard/LogButton";
import DailyEntries from "../../components/dashboard/DailyEntries";
import LogEntryMenu from "../../components/dashboard/LogEntryMenu";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');
  return (
    <div className="dark:bg-black dark:text-white mt-16">

      <LogButton />
      <div className="grid">
        <DailyEntries />
        <hr className="dark:border-zinc-900 border-zinc-100" />
        <DashboardStats />
        <LogEntryMenu />
        <footer className="h-20 grid place-content-center ">
          <a href="https://tylerlundin.me" target="_blank" rel="noopener noreferrer" className="text-gray-500 whitespace-nowrap">Created by Tyler</a>
        </footer>
      </div>
    </div>
  )
}

