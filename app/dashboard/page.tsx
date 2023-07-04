import Page from "@/components/Page";
import DailyCheck from "@/components/dashboard/DailyCheck";
import LogButton from "@/components/dashboard/LogButton";
import LogEventMenu from "@/components/dashboard/LogEventMenu";
import TitleBlock from "@/components/dashboard/TitleBlock";
import YourExercise from "@/components/dashboard/your/YourExercise";
import YourSleep from "@/components/dashboard/your/YourSleep";
import { authOptions } from "@server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/')
  return (
    <Page>
      <TitleBlock title={`Welcome, ${session.user.name}`} />
      <DailyCheck />
      <div className="p-4 w-full grid place-content-center">
        {/* @ts-expect-error */}
        <YourSleep />
        <YourExercise />
      </div>
      <LogButton />
      {/* @ts-expect-error */}
      <LogEventMenu />
    </Page>
  )
}

