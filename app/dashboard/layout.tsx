import LogButton from "@/components/dashboard/LogButton";
import VitalsSteps from "@/components/dashboard/VitalsSteps";
import Navigation from "@/components/navigation/Navigation"
import LoadingScreen from "@/components/ui/LoadingScreen";
import SavingScreen from "@/components/ui/SavingScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Navigation />
      <ToastContainer />
      <LogButton />
      <VitalsSteps />
      <LoadingScreen />
      <SavingScreen />
      {children}
    </>
  )
}
