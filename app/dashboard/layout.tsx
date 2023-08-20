import LogButton from "@/components/dashboard/LogButton";
import VitalsSteps from "@/components/dashboard/VitalsSteps";
import Navigation from "@/components/navigation/Navigation"
import LoadingScreen from "@/components/ui/LoadingScreen";
import SavingScreen from "@/components/ui/SavingScreen";
import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) { redirect('/auth/signin') }

  return (
    <>
      <Navigation />
      <ToastContainer />
      <LogButton />
      <VitalsSteps />
      <LoadingScreen />
      <SavingScreen />
      <div className=" bg-gradient-to-t from-white via-white to-white/50 dark:from-black dark:via-black dark:to-black/10 w-screen h-20 absolute bottom-0 left-0 z-30" />
      {children}
    </>
  )
}
