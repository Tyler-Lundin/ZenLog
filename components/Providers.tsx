'use client'

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store/store"
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}
