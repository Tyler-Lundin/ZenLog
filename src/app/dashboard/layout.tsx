import React from "react";
import DateDisplay from "../../components/dashboard/DateDisplay";
import DashboardMenu from "../../components/dashboard/DashboardMenu";
import AuthContext from "./AuthContext";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthContext>
        {children}
        <DateDisplay />
        <DashboardMenu />
      </AuthContext>
  )
}
