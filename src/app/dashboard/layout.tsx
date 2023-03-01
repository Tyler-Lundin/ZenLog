import React from "react";
import DateDisplay from "../../components/dashboard/DateDisplay";
import AuthContext from "./AuthContext";
import DashboardNav from "../../components/dashboard/nav/DashboardNav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthContext>
        <DateDisplay />
        <DashboardNav />
        <div>
          {children}
        </div>
      </AuthContext>
  )
}
