"use client";
import { useSession } from "next-auth/react";
import useDashboard from "../../hooks/useDashboard";
import useTheme from "../../hooks/useTheme";

const DASHBOARD = 'w-screen h-screen relative top-0 left-0 overflow-y-auto grid place-items-center gap-4 pt-20 transition-all duration-500 ease-in-out';

const Dashboard = () => {
  useDashboard();
  const { theme } = useTheme();
  const { data:session, status } = useSession();
  console.log({ session, status });

  return (
    <div className={DASHBOARD} style={{background:theme.background, color:theme.text}}>
      dashboard here
    </div>
  );
};

export default Dashboard;
