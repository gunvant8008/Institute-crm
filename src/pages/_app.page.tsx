import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
// REVIEW: void
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // void import("../mocksRest").then(({ setupMocks }) => {
  //   void setupMocks();
  // });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const {setupMocks } = require('../mocksRest')  ;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setupMocks();

}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}