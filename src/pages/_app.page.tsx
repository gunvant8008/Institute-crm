import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "@/AppComponents/Layout/Sidebar";
import Header from "@/AppComponents/Layout/Header";

const queryClient = new QueryClient();
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const { setupMocks } = require("../mocksRest");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setupMocks();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar>
        <div className="flex flex-col">
          <Header />
          <Component {...pageProps} />
        </div>
      </Sidebar>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
