import Navigation from "@/components/navigation/Navigation"
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
      {children}
    </>
  )
}
