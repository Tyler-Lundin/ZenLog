'use client'

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store/store"
import { ThemeProvider } from "next-themes";
import Assistant from "./ai/Assistant";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Assistant />
          {children}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}
