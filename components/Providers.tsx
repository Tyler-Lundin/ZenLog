'use client'
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store/store"
import _store from "@/_store"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Provider store={_store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      </Provider>
    </SessionProvider>
  )
}
