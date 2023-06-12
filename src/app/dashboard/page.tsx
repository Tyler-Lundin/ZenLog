import Page from "@/components/Page";
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
      <span className="p-4 w-full grid place-content-center">
        <LogButton />
        <LogEventMenu />
      </span>
    </Page>
  )
}
