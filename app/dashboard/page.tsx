import DashboardStats from "@/components/dashboard/DashboardStats";
import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogEntryMenu from "../../components/dashboard/LogEntryMenu";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/');
  return (
    <div className="dark:bg-black/50 dark:text-white mt-16">
      <hr className="dark:border-zinc-900 border-zinc-100" />
      <DashboardStats />
      <LogEntryMenu />
    </div>
  )
}

